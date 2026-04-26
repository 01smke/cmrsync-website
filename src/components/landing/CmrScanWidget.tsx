import { useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";

const FIELD_LABELS: Record<string, string> = {
  sender: "Sender",
  consignee: "Consignee",
  carrier_name: "Carrier",
  following_carriers: "Following Carriers",
  place_of_delivery: "Place of Delivery",
  pickup_location: "Pickup Location",
  pickup_date: "Pickup Date",
  goods_description: "Goods",
  gross_weight_kg: "Gross Weight (kg)",
  volume_m3: "Volume (m³)",
  driver_name: "Driver",
  truck_plate: "Truck Plate",
  shipping_terms: "Shipping Terms",
  document_date: "Document Date",
  stamp_date: "Stamp Date",
  ship_name: "Vessel Name",
  contact_person: "Contact Person",
  contact_info: "Contact Info",
};

const HIGHLIGHT_FIELDS = [
  "truck_plate",
  "driver_name",
  "gross_weight_kg",
  "document_date",
];

type CmrData = Record<string, unknown>;

function formatFieldValue(raw: unknown): string {
  if (!raw) return "";
  if (typeof raw === "object" && raw !== null) {
    const obj = raw as Record<string, string>;
    return [obj.name, obj.address, obj.country].filter(Boolean).join(", ");
  }
  return String(raw);
}

export function CmrScanWidget() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [results, setResults] = useState<CmrData | null>(null);

  const handleFile = useCallback((file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResults(null);
    setErrorMsg("");
    setStatus("idle");
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) handleFile(e.target.files[0]);
    },
    [handleFile]
  );

  const runScan = async () => {
    if (!selectedFile) return;
    setStatus("scanning");
    setErrorMsg("");
    setResults(null);

    const fd = new FormData();
    fd.append("file", selectedFile);

    try {
      const res = await fetch("/api/free-scan", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Something went wrong.");
      setResults(json.data);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      <div
        style={{
          border: `2px dashed ${dragOver ? "rgba(223,255,0,0.5)" : "rgba(45,48,56,0.8)"}`,
          borderRadius: 12,
          padding: "32px 24px",
          textAlign: "center",
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s",
          background: dragOver
            ? "rgba(223,255,0,0.04)"
            : "rgba(28,30,36,0.8)",
          position: "relative",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={onFileChange}
        />

        {!previewUrl ? (
          <>
            <div style={{ fontSize: "2.2rem", marginBottom: 12, color: "rgba(223,255,0,0.45)" }}>
              📄
            </div>
            <p style={{ color: "#9CA3AF", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 4 }}>
              Drag &amp; drop your CMR photo here
            </p>
            <p style={{ color: "#6B7280", fontSize: "0.73rem", marginBottom: 14 }}>
              JPEG · PNG · WebP · max 12 MB
            </p>
            <span
              style={{
                display: "inline-block",
                background: "#DFFF00",
                color: "#000",
                fontWeight: 700,
                fontSize: "0.875rem",
                borderRadius: 8,
                padding: "9px 20px",
                boxShadow: "0 0 20px rgba(223,255,0,0.25), 0 4px 14px rgba(0,0,0,0.4)",
                pointerEvents: "none",
              }}
            >
              Choose File
            </span>
          </>
        ) : (
          <img
            src={previewUrl}
            alt="CMR preview"
            style={{
              maxHeight: 160,
              maxWidth: "100%",
              borderRadius: 8,
              border: "1px solid rgba(45,48,56,0.8)",
              objectFit: "contain",
              margin: "0 auto",
              display: "block",
            }}
          />
        )}
      </div>

      {selectedFile && status !== "scanning" && (
        <button
          onClick={runScan}
          style={{
            display: "block",
            width: "100%",
            marginTop: 16,
            padding: "13px",
            background: "#DFFF00",
            color: "#000",
            fontWeight: 700,
            fontSize: "1rem",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            transition: "transform 0.18s ease, box-shadow 0.18s ease",
            boxShadow: "0 0 20px rgba(223,255,0,0.28), 0 4px 14px rgba(0,0,0,0.45)",
          }}
        >
          ⚡ Extract CMR Fields
        </button>
      )}

      {status === "scanning" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 14,
            fontSize: "0.82rem",
            color: "#9CA3AF",
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              border: "2px solid rgba(45,48,56,0.8)",
              borderTopColor: "#DFFF00",
              borderRadius: "50%",
              display: "inline-block",
              animation: "cmr-spin 0.7s linear infinite",
              flexShrink: 0,
            }}
          />
          <style>{`@keyframes cmr-spin { to { transform: rotate(360deg); } }`}</style>
          Sending to Claude AI…
        </div>
      )}

      {status === "error" && (
        <div
          style={{
            marginTop: 14,
            padding: "10px 14px",
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: 8,
            color: "#f87171",
            fontSize: "0.83rem",
          }}
        >
          {errorMsg}
        </div>
      )}

      {status === "done" && results && (
        <div
          style={{
            marginTop: 24,
            background: "rgba(28,30,36,0.95)",
            border: "1px solid rgba(45,48,56,0.8)",
            borderTop: "2px solid #DFFF00",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4), 0 0 20px rgba(223,255,0,0.06)",
            animation: "cmr-card-in 0.3s ease both",
          }}
        >
          <style>{`@keyframes cmr-card-in { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "13px 18px",
              borderBottom: "1px solid rgba(45,48,56,0.8)",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Extracted CMR Data</span>
            <span
              style={{
                background: "rgba(74,222,128,0.12)",
                color: "#4ade80",
                border: "1px solid rgba(74,222,128,0.25)",
                borderRadius: 6,
                padding: "2px 9px",
                fontSize: "0.7rem",
                fontWeight: 700,
              }}
            >
              ✓ Extracted
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {Object.entries(FIELD_LABELS).map(([key, label], i) => {
              const display = formatFieldValue(results[key]);
              const isEmpty = !display || display === "Not legible";
              const isHighlight = HIGHLIGHT_FIELDS.includes(key) && !isEmpty;
              return (
                <div
                  key={key}
                  style={{
                    padding: "11px 18px",
                    borderBottom: "1px solid rgba(45,48,56,0.6)",
                    borderRight: i % 2 === 0 ? "1px solid rgba(45,48,56,0.4)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.63rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#6B7280",
                      marginBottom: 3,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: isEmpty ? "rgba(45,48,56,0.9)" : isHighlight ? "#DFFF00" : "#e5e7eb",
                      fontStyle: isEmpty ? "italic" : "normal",
                      fontWeight: isHighlight ? 600 : 400,
                      wordBreak: "break-word",
                    }}
                  >
                    {isEmpty ? "—" : display}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              padding: "13px 18px",
              borderTop: "1px solid rgba(45,48,56,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: "0.82rem", color: "#9CA3AF", lineHeight: 1.4 }}>
              <strong style={{ color: "#fff" }}>
                This runs on every CMR your drivers send via Telegram.
              </strong>
              <br />
              Unlimited scans, PDF invoices, bundle export — from €49/mo.
            </div>
            <a
              href="#pricing"
              style={{
                background: "#DFFF00",
                color: "#000",
                fontWeight: 700,
                fontSize: "0.85rem",
                border: "none",
                borderRadius: 8,
                padding: "10px 20px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 0 18px rgba(223,255,0,0.25)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Start Free Trial <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
