import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

// --- Demo content generator ---
const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Vivamus porta augue non dictum lobortis.",
  "Cras iaculis, lectus at facilisis interdum, mi justo dignissim mi.",
  "Integer posuere dictum lectus, ut volutpat odio fermentum at.",
  "Suspendisse potenti. In hac habitasse platea dictumst.",
  "Maecenas vulputate felis et risus posuere, a consequat velit lacinia.",
  "Curabitur imperdiet semper elit, quis gravida ligula vehicula at.",
  "Aliquam erat volutpat. Donec tristique, tellus at luctus elementum."
];
const kinds = ["hero", "quote", "card"];

app.get("/api/section", (req, res) => {
  const kind = String(req.query.kind || "card");
  const index = Number(req.query.index || 0);
  if (!kinds.includes(kind)) return res.status(400).json({ error: `Unknown kind: ${kind}` });
  if (!Number.isFinite(index) || index < 0) return res.status(400).json({ error: `Invalid index: ${req.query.index}` });

  const seed = (index * 131 + kind.length * 17) % LOREM.length;
  const title = `${kind.toUpperCase()} #${index}`;
  const text = `${LOREM[seed]} ${LOREM[(seed + 3) % LOREM.length]}`;
  const image = `https://picsum.photos/seed/${encodeURIComponent(kind + "-" + index)}/800/400`;

  const payload = { kind, index, title, text, image };
  const delay = 150 + (index % 5) * 120; // simulate jitter
  setTimeout(() => res.json(payload), delay);
});

// If running a production build, serve the built client
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));
app.get("*", (_req, res, next) => {
  // only serve index.html if it exists (after build)
  res.sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`API + static server running at http://localhost:${PORT}`);
});