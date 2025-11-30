import { create } from "zustand";

export const useSectionsStore = create((set, get) => ({
  cache: new Map(),         // key -> payload
  loading: new Set(),       // Set of keys
  error: new Map(),         // key -> message

  has: (key) => get().cache.has(key),
  get: (key) => get().cache.get(key),

  fetchIfNeeded: async (kind, index) => {
    const key = `${kind}:${index}`;
    const { cache, loading } = get();
    if (cache.has(key) || loading.has(key)) return;

    set((s) => ({ loading: new Set(s.loading).add(key) }));
    try {
      const r = await fetch(`/api/section?kind=${encodeURIComponent(kind)}&index=${index}`);
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      const data = await r.json();
      set((s) => {
        const nextCache = new Map(s.cache);
        nextCache.set(key, data);
        const nextLoading = new Set(s.loading);
        nextLoading.delete(key);
        const nextError = new Map(s.error);
        nextError.delete(key);
        return { cache: nextCache, loading: nextLoading, error: nextError };
      });
    } catch (e) {
      set((s) => {
        const nextLoading = new Set(s.loading);
        nextLoading.delete(key);
        const nextError = new Map(s.error);
        nextError.set(key, e.message || String(e));
        return { loading: nextLoading, error: nextError };
      });
    }
  }
}));