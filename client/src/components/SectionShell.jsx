import React, { useEffect } from "react";
import { useSectionsStore } from "../store/sections.js";
import { useOnView } from "../hooks/useOnView.js";
import Hero from "./Hero.jsx";
import Quote from "./Quote.jsx";
import Card from "./Card.jsx";

export default function SectionShell({ kind, index }) {
  const key = `${kind}:${index}`;
  const fetchIfNeeded = useSectionsStore((s) => s.fetchIfNeeded);
  const cached = useSectionsStore((s) => s.cache.get(key));
  const isLoading = useSectionsStore((s) => s.loading.has(key));
  const error = useSectionsStore((s) => s.error.get(key));

  const [ref, inView] = useOnView({ rootMargin: "400px" });

  useEffect(() => {
    if (inView) fetchIfNeeded(kind, index);
  }, [inView, kind, index, fetchIfNeeded]);

  const cls = `section ${kind} ${isLoading && !cached ? "loading" : ""}`;

  return (
    <div ref={ref} className={cls}>
      {error && <div style={{ padding: 16, color: "#fecaca" }}>Error: {error}</div>}
      {!error && kind === "hero" && <Hero data={cached} index={index} />}
      {!error && kind === "quote" && <Quote data={cached} index={index} />}
      {!error && kind === "card" && <Card data={cached} index={index} />}
    </div>
  );
}