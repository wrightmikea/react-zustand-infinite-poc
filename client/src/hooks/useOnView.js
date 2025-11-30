import { useEffect, useRef, useState } from "react";

/** Web-only viewport hook. Replace in RN with FlatList callbacks. */
export function useOnView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect(); // only first time
          break;
        }
      }
    }, options || { rootMargin: "400px" });

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, inView];
}