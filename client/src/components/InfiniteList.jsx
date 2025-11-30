import React, { useMemo } from "react";
import SectionShell from "./SectionShell.jsx";

export default function InfiniteList() {
  // Randomized list of 30 items, each of kind hero|quote|card
  const items = useMemo(() => {
    const kinds = ["hero", "quote", "card"];
    const arr = [];
    for (let i = 0; i < 30; i++) {
      const k = kinds[Math.floor(Math.random() * kinds.length)];
      arr.push({ kind: k, index: i });
    }
    return arr;
  }, []);

  return (
    <div className="container">
      {items.map(({ kind, index }) => (
        <SectionShell key={`${kind}:${index}`} kind={kind} index={index} />
      ))}
      <div className="footer">— end of demo —</div>
    </div>
  );
}