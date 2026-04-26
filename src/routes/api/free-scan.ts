import { createAPIFileRoute } from "@tanstack/react-start/api";
import Anthropic from "@anthropic-ai/sdk";

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

const rateLimitMap = new Map<string, number>();
const COOLDOWN = 86400 * 1000;

export const APIRoute = createAPIFileRoute("/api/free-scan")({
  POST: async ({ request }) => {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      "unknown";
    const now = Date.now();
    const last = rateLimitMap.get(ip);
    if (last && now - last < COOLDOWN) {
      const remainingHours = Math.ceil((COOLDOWN - (now - last)) / 3600000);
      return new Response(
        JSON.stringify({
          error: `One free scan per day. Try again in ~${remainingHours}h.`,
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/tiff",
    ];
    const mime = file.type || "image/jpeg";
    if (!allowed.includes(mime)) {
      return new Response(
        JSON.stringify({
          error: "Please upload a JPEG, PNG, or WebP image.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    if (arrayBuffer.byteLength > 12 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "File too large. Max 12 MB." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const client = new Anthropic({ apiKey });
      const b64 = Buffer.from(arrayBuffer).toString("base64");

      const msg = await client.messages.create({
        model: "claude-opus-4-5",
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mime as
                    | "image/jpeg"
                    | "image/png"
                    | "image/webp"
                    | "image/gif",
                  data: b64,
                },
              },
              { type: "text", text: USER_PROMPT },
            ],
          },
        ],
      });

      let raw = (msg.content[0] as { text: string }).text.trim();
      const match = raw.match(/\{.*\}/s);
      if (match) raw = match[0];

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { _error: "Could not parse response", _raw: raw.slice(0, 400) };
      }

      rateLimitMap.set(ip, now);
      return new Response(JSON.stringify({ ok: true, data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
});
