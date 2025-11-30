import React from "react";
import YouTubePlayer from "./YouTubePlayer.jsx";

export default function Quote({ data, index }) {
  return (
    <div className="quote">
      <div className="quote-title">{data?.title || "Loading…"}</div>
      {data?.video && (
        <YouTubePlayer videoId={data.video.id} title={data.video.title} />
      )}
      <div className="quote-text">"{data?.text || "Loading…"}"</div>
      <div className="by">— QUOTE · #{index}</div>
    </div>
  );
}