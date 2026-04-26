import { useRef, useState, useCallback, useEffect } from "react";
import { CmrResultModal } from "./CmrResultModal";

type CmrData = Record<string, unknown>;

const STEPS = [
  { label: "Uploading image", duration: 800 },
  { label: "Reading document layout", duration: 1200 },
  { label: "Extracting handwritten fields", duration: 1800 },
  { label: "Parsing stamps & dates", duration: 1000 },
  { label: "Structuring data", duration: 600 },
];

function ProgressSteps({ active }: { active: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!active) {
      setCurrentStep(0);
      setCompletedSteps(new Set());
      return;
    }
    let step = 0;
    let timeout: ReturnType<typeof setTimeout>;

    function advance() {
      if (step >= STEPS.length) return;
      setCurrentStep(step);
      const duration = STEPS[step].duration;
      timeout = setTimeout(() => {
        setCompletedSteps((prev) => new Set([...prev, step]));
        step++;
        if (step < STEPS.length) advance();
      }, duration);
    }

    advance();
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      {STEPS.map((s, i) => {
        const done = completedSteps.has(i);
        const running = active && currentStep === i && !done;
        const pending = !done && !running;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: pending ? 0.35 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
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
                borderWidth: done ? "1.5px" : "2px",
                borderStyle: "solid",
                borderColor: running ? "#2D3038" : done ? "rgba(223,255,0,0.5)" : "#2D3038",
                borderTopColor: running ? "#DFFF00" : done ? "rgba(223,255,0,0.5)" : "#2D3038",
                animation: running ? "cmr-spin 0.7s linear infinite" : undefined,
              }}
            >
              {done && (
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#DFFF00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              style={{
                fontSize: "0.8rem",
                color: done ? "#9CA3AF" : running ? "#fff" : "#6B7280",
                fontWeight: running ? 500 : 400,
                transition: "color 0.3s ease",
              }}
            >
              {s.label}
              {running && (
                <span style={{ color: "#DFFF00" }}>
                  {"..."}
                </span>
              )}
            </span>
          </div>
        );
      })}
      <style>{`@keyframes cmr-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function CmrScanWidget() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [results, setResults] = useState<CmrData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
      setTimeout(() => setModalOpen(true), 400);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  };

  return (
    <>
      <div
        style={{
          border: `2px dashed ${dragOver ? "rgba(223,255,0,0.5)" : "rgba(45,48,56,0.8)"}`,
          borderRadius: 12,
          padding: previewUrl ? "16px" : "32px 24px",
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

      {status === "scanning" && <ProgressSteps active={true} />}

      {status === "idle" && selectedFile && (
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

      {status === "done" && results && (
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

      <CmrResultModal
        open={modalOpen}
        data={results}
        previewUrl={previewUrl}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
