import React from "react";
import YouTubePlayer from "./YouTubePlayer.jsx";

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export default function Hero({ data, index }) {
  return (
    <>
      <div className="content">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge>#{index}</Badge>
          <small style={{ color: "#94a3b8" }}>HERO</small>
        </div>
        <h2>{data?.title || "Loading…"}</h2>
        {data?.video && (
          <YouTubePlayer videoId={data.video.id} title={data.video.title} />
        )}
        <p style={{ margin: "16px 0 0", color: "#94a3b8" }}>{data?.text || "Fetching…"}</p>
      </div>
    </>
  );
}