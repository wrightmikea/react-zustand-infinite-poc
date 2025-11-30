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

// --- Cat Videos from YouTube (verified embeddable) ---
const CAT_VIDEOS = [
  { id: "W86cTIoMv2U", title: "World's Smallest Cat - BBC" },
  { id: "0Bmhjf0rKe8", title: "Surprised Kitty (Original)" },
  { id: "z_AbfPXTKms", title: "Maru - I Love Box" },
  { id: "G4Sn91t1V4g", title: "Dear Kitten" },
  { id: "INVALID_ID_TEST", title: "Video Not Found Example" },
  { id: "Q34z5dCmC4M", title: "Henri 2, Paw de Deux" },
  { id: "w0ffwDYo00Q", title: "Cat Man Do - Simon's Cat" },
  { id: "4rb8aOzy9t4", title: "Let Me In! - Simon's Cat" },
  { id: "qpl5mOAXNl4", title: "I'm a Stupid Cat!" },
  { id: "X3iFhLdWjqc", title: "Cats Playing Patty-cake" },
  { id: "wf_IIbT8HGk", title: "Supercats Episode 1" },
  { id: "tu0qtEwb9gE", title: "Keyboard Cat Redux" },
  { id: "5dsGWM5XGdg", title: "Cats Are So Funny" },
  { id: "ZuHZSbPJhaY", title: "Lil BUB's Magical Yule LOG" },
  { id: "2XID_W4neJo", title: "Maru - Too Small Boxes" },
  { id: "S7znI_Kpzbs", title: "You Shall Not Pass, Dog" },
  { id: "PKffm2uI4dk", title: "Sad Cat Diary" },
  { id: "mHXBL6bzAR4", title: "An Engineer's Guide to Cats" },
  { id: "Pk7yqlTMvp8", title: "Cowboys Herding Cats" },
  { id: "lAIGb1lfpBw", title: "MitchiriNeko March" },
  { id: "xbs7FT7dXYc", title: "Cat TV - 8 Hour Birds" },
  { id: "YLDbGqJ2KYk", title: "Kitten Surprise!" },
  { id: "nxhgP6xsrsY", title: "Funny Cat Moments" },
  { id: "hPzNl6NKAG0", title: "Training Cat" },
  { id: "bGgKdDCJx5o", title: "Relaxing Cat Video" },
  { id: "UbQgXeY_zi4", title: "Caravan Palace - Lone Digger" },
  { id: "tpiyEe_CqB4", title: "Peaceful Cat" },
  { id: "aFuUidBR1aQ", title: "Cat Compilation" },
  { id: "hGlyFc79BUE", title: "Badgers 10 Hours" },
  { id: "9hBpF_Zj4OA", title: "Rotate Your Owl" }
];

const kinds = ["hero", "quote", "card"];

app.get("/api/section", (req, res) => {
  const kind = String(req.query.kind || "card");
  const index = Number(req.query.index || 0);
  if (!kinds.includes(kind)) return res.status(400).json({ error: `Unknown kind: ${kind}` });
  if (!Number.isFinite(index) || index < 0) return res.status(400).json({ error: `Invalid index: ${req.query.index}` });

  const seed = (index * 131 + kind.length * 17) % LOREM.length;
  const video = CAT_VIDEOS[index % CAT_VIDEOS.length];
  const title = video.title;
  const text = `${LOREM[seed]} ${LOREM[(seed + 3) % LOREM.length]}`;
  const image = `https://picsum.photos/seed/${encodeURIComponent(kind + "-" + index)}/800/400`;

  const payload = { kind, index, title, text, image, video };
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