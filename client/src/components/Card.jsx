import React from "react";

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export default function Card({ data, index }) {
  return (
    <div className="card">
      <img src={data?.image || "https://picsum.photos/220/160?blur=2"} alt="" />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge>#{index}</Badge>
          <small style={{ color: "#94a3b8" }}>CARD</small>
        </div>
        <h3>{data?.title || "Loading…"}</h3>
        <p>{data?.text || "Fetching…"}</p>
      </div>
    </div>
  );
}