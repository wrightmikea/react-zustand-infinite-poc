import React from "react";

export default function Quote({ data, index }) {
  return (
    <div className="quote">
      <div>“{data?.text || "Loading…"}”</div>
      <div className="by">— QUOTE · #{index}</div>
    </div>
  );
}