# React + Zustand Infinite Scroll (POC) with Express API

This is a **portable** proof-of-concept intended to keep business/state logic React-Native‑friendly:
- UI components are web React for now; store + data layer is framework‑agnostic (no DOM APIs inside store).
- The only web-specific piece is the viewport detection hook (`useOnView`). In React Native, you'd replace this with a `FlatList` `onEndReached` or a visibility callback library.

## Structure
```
react-zustand-infinite-poc/
├─ client/     # Vite + React web app (POC UI)
└─ server/     # Express REST API and static serving of /client/dist (for production build)
```

## Quick start (dev)
```bash
./scripts/serve.sh
# API at http://localhost:5174
# App at http://localhost:5173 (Vite dev server)
```
This starts both the Express API server and the Vite dev server concurrently.

## Production build
```bash
./scripts/build-all.sh
cd server && npm start
# Open http://localhost:5174
```

## Notes
- **Randomized sequence**: the client generates 30 sections, each randomly assigned one of three kinds (`hero`, `quote`, `card`).
- **Fetch-on-view**: each section triggers `GET /api/section?kind=K&index=I` once when it enters the viewport; responses are cached in a **Zustand** store.
- **Porting to React Native**: keep `src/store/sections.js` and any service modules as-is; swap the view components and the visibility hook.
