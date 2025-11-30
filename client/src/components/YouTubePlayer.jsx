import React, { useRef, useEffect, useState, useCallback } from "react";

// Valid YouTube video ID is 11 characters, alphanumeric plus - and _
const isValidVideoId = (id) => /^[a-zA-Z0-9_-]{11}$/.test(id);

// Global YouTube API ready state
let ytApiReady = false;
let ytApiCallbacks = [];

// Load YouTube IFrame API once
if (typeof window !== "undefined" && !window.YT) {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () => {
    ytApiReady = true;
    ytApiCallbacks.forEach(cb => cb());
    ytApiCallbacks = [];
  };
}

function onYTReady(callback) {
  if (ytApiReady && window.YT && window.YT.Player) {
    callback();
  } else {
    ytApiCallbacks.push(callback);
  }
}

export default function YouTubePlayer({ videoId, title }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const iframeIdRef = useRef(`yt-player-${videoId}-${Math.random().toString(36).substr(2, 9)}`);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [error, setError] = useState(() =>
    !isValidVideoId(videoId) ? "Invalid video ID" : null
  );

  // Check if element is centered in viewport (middle 50% of screen)
  const isCentered = useCallback(() => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementBottom = rect.bottom;

    // Video should be mostly visible and in center portion of screen
    const topThreshold = viewportHeight * 0.25;
    const bottomThreshold = viewportHeight * 0.75;

    // Check if the center of the video is in the middle 50% of viewport
    const elementCenter = (elementTop + elementBottom) / 2;
    return elementCenter > topThreshold && elementCenter < bottomThreshold;
  }, []);

  // Initialize YouTube player
  useEffect(() => {
    if (error || !isValidVideoId(videoId)) return;

    const initPlayer = () => {
      if (!containerRef.current || playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player(iframeIdRef.current, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            mute: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              setPlayerReady(true);
              // Check if should autoplay immediately
              if (isCentered()) {
                event.target.playVideo();
              }
            },
            onStateChange: (event) => {
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            },
            onError: (event) => {
              const errorMessages = {
                2: "Invalid video ID",
                5: "Video playback error",
                100: "Video not found",
                101: "Video cannot be embedded",
                150: "Video cannot be embedded"
              };
              setError(errorMessages[event.data] || "Video unavailable");
            },
          },
        });
      } catch (e) {
        console.error("Failed to create player:", e);
        setError("Failed to load video player");
      }
    };

    onYTReady(initPlayer);

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
        playerRef.current = null;
      }
    };
  }, [videoId, error, isCentered]);

  // Handle scroll-based autoplay/pause
  useEffect(() => {
    if (!playerReady || !playerRef.current || error) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        if (!playerRef.current) return;

        const centered = isCentered();

        try {
          const state = playerRef.current.getPlayerState?.();
          const isCurrentlyPlaying = state === window.YT.PlayerState.PLAYING;

          if (centered && !isCurrentlyPlaying) {
            playerRef.current.playVideo();
          } else if (!centered && isCurrentlyPlaying) {
            playerRef.current.pauseVideo();
          }
        } catch (e) {
          // Player not ready or destroyed
        }
      });
    };

    // Check initial state after a short delay
    const initialCheck = setTimeout(handleScroll, 500);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      clearTimeout(initialCheck);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [playerReady, isCentered, error]);

  if (error) {
    return (
      <div className="youtube-player-wrapper">
        <div className="youtube-player-title">{title}</div>
        <div className="youtube-player-container youtube-player-error">
          <div className="youtube-error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="youtube-player-wrapper" ref={containerRef}>
      <div className="youtube-player-title">{title}</div>
      <div className="youtube-player-container">
        <div id={iframeIdRef.current} className="youtube-player" />
        {!playerReady && (
          <div className="youtube-player-loading">Loading video...</div>
        )}
      </div>
    </div>
  );
}
