import React from "react";

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export default function Hero({ data, index }) {
  return (
    <>
      <img src={data?.image || "https://picsum.photos/800/400?blur=2"} alt="" />
      <div className="content">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge>#{index}</Badge>
          <small style={{ color: "#94a3b8" }}>HERO</small>
        </div>
        <h2>{data?.title || "Loading…"}</h2>
        <p style={{ margin: 0, color: "#94a3b8" }}>{data?.text || "Fetching…"}</p>
      </div>
    </>
  );
}