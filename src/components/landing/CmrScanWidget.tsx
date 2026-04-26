import { useRef, useState, useCallback, useEffect } from "react";
import { CmrResultModal } from "./CmrResultModal";

type CmrData = Record<string, unknown>;

const STEPS = [
  { label: "Uploading image",              duration: 900 },
  { label: "Reading document layout",      duration: 1400 },
  { label: "Extracting handwritten fields",duration: 2000 },
  { label: "Parsing stamps & dates",       duration: 1200 },
  { label: "Structuring data",             duration: 700  },
];

function ProgressSteps({ active }: { active: boolean }) {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!active) {
      setActiveStep(-1);
      return;
    }
    setActiveStep(0);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cumulative = 0;
    STEPS.forEach((s, i) => {
      cumulative += s.duration;
      const t = setTimeout(() => setActiveStep(i + 1), cumulative);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [active]);

  return (
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
      {STEPS.map((s, i) => {
        const done    = activeStep > i;
        const running = activeStep === i;
        const pending = activeStep < i;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: pending ? 0.32 : 1,
              transition: "opacity 0.35s ease",
            }}
          >
            {/* Step indicator */}
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: done ? "rgba(223,255,0,0.15)" : "transparent",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: done ? "rgba(223,255,0,0.5)" : "#2D3038",
                borderTopColor: running ? "#DFFF00" : done ? "rgba(223,255,0,0.5)" : "#2D3038",
                animation: running ? "cmr-spin 0.7s linear infinite" : "none",
              }}
            >
              {done && (
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#DFFF00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>

            <span
              style={{
                fontSize: "0.8rem",
                color: done ? "#6B7280" : running ? "#fff" : "#6B7280",
                fontWeight: running ? 500 : 400,
                transition: "color 0.3s ease",
              }}
            >
              {s.label}
              {running && <span style={{ color: "#DFFF00" }}>…</span>}
            </span>
          </div>
        );
      })}
      <style>{`@keyframes cmr-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function CmrScanWidget() {
  const SCAN_TS_KEY   = "cmr_last_scan_ts";
  const LEAD_KEY      = "cmr_lead_unlocked";
  const LIMIT_MS      = 24 * 60 * 60 * 1000;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [results, setResults] = useState<CmrData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getHoursLeft = () => {
    if (typeof window === "undefined") return 0;
    const ts = localStorage.getItem(SCAN_TS_KEY);
    if (!ts) return 0;
    const remaining = LIMIT_MS - (Date.now() - parseInt(ts, 10));
    return remaining > 0 ? Math.ceil(remaining / (60 * 60 * 1000)) : 0;
  };

  const [hoursLeft, setHoursLeft] = useState(() => getHoursLeft());
  const scanLocked = hoursLeft > 0;

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

    const fresh = getHoursLeft();
    if (fresh > 0) {
      setHoursLeft(fresh);
      return;
    }

    setStatus("scanning");
    setErrorMsg("");
    setResults(null);

    const fd = new FormData();
    fd.append("file", selectedFile);

    try {
      const res = await fetch("/api/free-scan", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Something went wrong.");
      localStorage.setItem(SCAN_TS_KEY, Date.now().toString());
      setHoursLeft(24);
      setResults(json.data);
      setStatus("done");
      setTimeout(() => setModalOpen(true), 400);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  };

  return (
    <>
      {scanLocked ? (
        /* ── LOCKED STATE ── */
        <div
          style={{
            borderRadius: 12,
            padding: "28px 20px",
            textAlign: "center",
            background: "rgba(28,30,36,0.8)",
            border: "2px dashed rgba(45,48,56,0.8)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: 10 }}>🔒</div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", marginBottom: 6 }}>
            Free scan used
          </p>
          <p style={{ color: "#6B7280", fontSize: "0.78rem", lineHeight: 1.5 }}>
            Your next free scan unlocks in <span style={{ color: "#DFFF00", fontWeight: 600 }}>{hoursLeft}h</span>.
            <br />Sign up for unlimited scans.
          </p>
          <a
            href="#pricing"
            style={{
              display: "inline-block",
              marginTop: 14,
              padding: "8px 20px",
              background: "#DFFF00",
              color: "#000",
              fontWeight: 700,
              fontSize: "0.82rem",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            See plans →
          </a>
        </div>
      ) : (
      <div
        style={{
          border: `2px dashed ${dragOver ? "rgba(223,255,0,0.5)" : "rgba(45,48,56,0.8)"}`,
          borderRadius: 12,
          padding: previewUrl ? "12px" : "20px 16px",
          textAlign: "center",
          cursor: status === "scanning" ? "default" : "pointer",
          transition: "border-color 0.2s, background 0.2s",
          background: dragOver ? "rgba(223,255,0,0.04)" : "rgba(28,30,36,0.8)",
          position: "relative",
        }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={status !== "scanning" ? onDrop : undefined}
        onClick={() => status !== "scanning" && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={onFileChange}
        />

        {previewUrl ? (
          <img
            src={previewUrl}
            alt="CMR preview"
            style={{
              maxHeight: 140,
              maxWidth: "100%",
              borderRadius: 8,
              border: "1px solid rgba(45,48,56,0.8)",
              objectFit: "contain",
              margin: "0 auto",
              display: "block",
            }}
          />
        ) : (
          <>
            <div style={{ fontSize: "2.2rem", marginBottom: 12, color: "rgba(223,255,0,0.45)" }}>📄</div>
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
        )}
      </div>
      )}

      {!scanLocked && status === "scanning" && <ProgressSteps active={true} />}

      {!scanLocked && status === "idle" && selectedFile && (
        <button
          onClick={runScan}
          style={{
            display: "block",
            width: "100%",
            marginTop: 14,
            padding: "12px",
            background: "#DFFF00",
            color: "#000",
            fontWeight: 700,
            fontSize: "0.95rem",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            transition: "transform 0.18s ease, box-shadow 0.18s ease",
            boxShadow: "0 0 20px rgba(223,255,0,0.28), 0 4px 14px rgba(0,0,0,0.45)",
          }}
        >
          Extract CMR Fields
        </button>
      )}

      {!scanLocked && status === "done" && results && (
        <button
          onClick={() => setModalOpen(true)}
          style={{
            display: "block",
            width: "100%",
            marginTop: 14,
            padding: "12px",
            background: "transparent",
            color: "#DFFF00",
            fontWeight: 600,
            fontSize: "0.88rem",
            border: "1.5px solid rgba(223,255,0,0.35)",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          View extracted data →
        </button>
      )}

      {!scanLocked && status === "error" && (
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

      <CmrResultModal
        open={modalOpen}
        data={results}
        previewUrl={previewUrl}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
