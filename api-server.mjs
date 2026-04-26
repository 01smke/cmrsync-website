import express from "express";
import cors from "cors";
import multer from "multer";
import Anthropic from "@anthropic-ai/sdk";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 12 * 1024 * 1024 } });

app.set("trust proxy", 1);
if (!isProd) {
  app.use(cors());
}
app.use(express.json());

const SYSTEM_PROMPT = `You are an expert logistics document analyzer specializing in CMR (International Consignment Notes). Your goal is to extract handwritten and printed text from images with maximum accuracy.
CRITICAL INSTRUCTIONS:
- Do not be overly cautious. If you can make a highly probable guess at a handwritten word, provide that guess.
- Contextual Clues: Use the surrounding printed text (e.g., "Sender", "Consignee", "Gross weight") to identify which box you are reading.
- Handwriting Focus: Prioritize the handwritten ink over the printed form lines.
- Formatting: Return the data in strict JSON. If a field is completely blank or unreadable, only then use "Not legible". Otherwise, provide the most likely text.
- Specific Fields to hunt for:
  * Field 1:  Sender name and address (top left).
  * Field 2:  Consignee/receiver name and address (middle left).
  * Field 16: Carrier name and address — look for the box labeled "Carrier" or "Vežėjas" (usually upper-right area).
  * Field 17: Successive/following carriers — look for "Successive carriers" label.
  * Driver:   Look for "Naam Chauffeur", "Driver", "Vairuotojas", or a signature block with a name.
  * Field 25: Truck plate / vehicle registration — look for plate-like text (e.g. "KDF 056").
  * Field 3:  Place of delivery.
  * Field 4:  Place and date of taking over / pickup.
  * Field 6/9: Quantity and item descriptions.
  * Field 11: Gross weight in kg.
  * Field 12: Volume in m³.
  * Field 21: Date of issue AND any Incoterms/shipping terms (e.g. "DAP Genoa", "EXW", "CIF").
  * Stamps:   CRITICALLY look for any red or blue rectangular/oval stamps. If a stamp contains a date, extract it as stamp_date.
  * Notes/contacts: Look in any free-text boxes or margins for ship names, contact persons, phone numbers, or email addresses.`;

const USER_PROMPT = `Extract all CMR fields from this document image and return ONLY a JSON object. No text before or after the JSON. No markdown code fences.
Return this exact structure:
{
  "sender":             { "name": "...", "address": "...", "country": "..." },
  "consignee":          { "name": "...", "address": "...", "country": "..." },
  "carrier_name":       "...",
  "following_carriers": "...",
  "place_of_delivery":  "...",
  "pickup_location":    "...",
  "pickup_date":        "...",
  "goods_description":  "...",
  "gross_weight_kg":    "...",
  "volume_m3":          "...",
  "driver_name":        "...",
  "truck_plate":        "...",
  "shipping_terms":     "...",
  "document_date":      "...",
  "stamp_date":         "...",
  "ship_name":          "...",
  "contact_person":     "...",
  "contact_info":       "..."
}`;

const rateLimitMap = new Map();
const COOLDOWN = 86400 * 1000;

app.post("/api/free-scan", upload.single("file"), async (req, res) => {
  const ip = req.ip || "unknown";
  const now = Date.now();

  const lastUsed = rateLimitMap.get(ip);
  if (lastUsed && now - lastUsed < COOLDOWN) {
    const retryAfterMs = COOLDOWN - (now - lastUsed);
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);
    return res.status(429).json({
      error: "Free scan limit reached. Please try again after 24 hours.",
      retryAfter: retryAfterSec,
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/tiff"];
  const mime = req.file.mimetype || "image/jpeg";
  if (!allowed.includes(mime)) {
    return res.status(400).json({ error: "Please upload a JPEG, PNG, or WebP image." });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured." });
  }

  try {
    const client = new Anthropic({ apiKey });
    const b64 = req.file.buffer.toString("base64");

    const msg = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mime, data: b64 } },
          { type: "text", text: USER_PROMPT }
        ]
      }]
    });

    let raw = msg.content[0].text.trim();
    const match = raw.match(/\{.*\}/s);
    if (match) raw = match[0];

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { _error: "Could not parse response", _raw: raw.slice(0, 400) };
    }

    rateLimitMap.set(ip, now);
    return res.json({ ok: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
});

// In-memory lead store (persists while server is running)
const leads = [];

app.post("/api/leads", (req, res) => {
  const { company, phone, email, cmrs: fleet_size, timestamp } = req.body || {};
  if (!company || !email) return res.status(400).json({ error: "Missing fields" });
  const lead = { company, phone, email, fleet_size, timestamp, id: Date.now() };
  leads.push(lead);
  console.log("[LEAD]", JSON.stringify(lead));
  res.json({ ok: true });
});

app.get("/api/leads", (req, res) => {
  const adminSecret = process.env.LEADS_ADMIN_SECRET;
  if (!adminSecret) {
    return res.status(503).json({ error: "Leads endpoint is not configured." });
  }
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token || token !== adminSecret) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  res.json(leads);
});

// In production, serve the built SPA + fall through to index.html
if (isProd) {
  const distPath = path.join(__dirname, "dist", "client");
  app.use(express.static(distPath));
  // SPA fallback — serve index.html for any non-API route
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const PORT = isProd ? (parseInt(process.env.PORT || "5000")) : 3001;
const HOST = isProd ? "0.0.0.0" : "localhost";
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
