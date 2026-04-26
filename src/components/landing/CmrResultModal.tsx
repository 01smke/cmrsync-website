import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, FileText, ArrowRight } from "lucide-react";

type CmrData = Record<string, unknown>;

interface Props {
  open: boolean;
  data: CmrData | null;
  previewUrl: string | null;
  onClose: () => void;
}

const NEON_KEYS = new Set([
  "sender_name",
  "consignee_name",
  "driver_name",
  "truck_plate",
  "gross_weight_kg",
  "pickup_location",
  "place_of_delivery",
]);

function isNL(v: unknown): boolean {
  return !v || String(v).trim().toLowerCase() === "not legible";
}

function Field({
  label,
  fieldKey,
  val,
  span,
  multiline,
}: {
  label: string;
  fieldKey: string;
  val: unknown;
  span?: boolean;
  multiline?: boolean;
}) {
  const empty = isNL(val);
  const neon = NEON_KEYS.has(fieldKey) && !empty;
  const display = empty ? "" : String(val);

  const inputStyle: React.CSSProperties = {
    background: "#0F1115",
    border: `1px solid ${neon ? "rgba(223,255,0,0.18)" : empty ? "rgba(251,191,36,0.18)" : "#2D3038"}`,
    borderRadius: 6,
    padding: "6px 10px",
    color: empty ? "#9CA3AF" : neon ? "#DFFF00" : "#fff",
    fontWeight: neon ? 600 : 400,
    fontSize: "0.78rem",
    fontFamily: "Inter, sans-serif",
    width: "100%",
    outline: "none",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
    resize: multiline ? "vertical" : undefined,
    minHeight: multiline ? 52 : undefined,
  };

  return (
    <div style={{ gridColumn: span ? "1 / -1" : undefined, display: "flex", flexDirection: "column", gap: 3 }}>
      <label
        style={{
          fontSize: "0.64rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#6B7280",
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          readOnly
          value={display}
          placeholder="Not legible"
          rows={3}
          style={inputStyle as React.CSSProperties}
        />
      ) : (
        <input
          readOnly
          type="text"
          value={display}
          placeholder="Not legible"
          style={inputStyle}
        />
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          fontSize: "0.63rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "#DFFF00",
          marginBottom: 8,
          opacity: 0.9,
        }}
      >
        {title}
      </div>
      <div className="cmr-field-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {children}
      </div>
    </div>
  );
}

const inputBase: React.CSSProperties = {
  background: "#0F1115",
  border: "1px solid #2D3038",
  borderRadius: 7,
  padding: "9px 12px",
  color: "#fff",
  fontSize: "0.84rem",
  fontFamily: "Inter, sans-serif",
  width: "100%",
  outline: "none",
  boxSizing: "border-box",
};


export function CmrResultModal({ open, data, previewUrl, onClose }: Props) {
  const [mounted, setMounted]       = useState(false);
  const [rendered, setRendered]     = useState(false);
  const [gated, setGated]           = useState(true);
  const [isMobile, setIsMobile]     = useState(false);
  const [form, setForm]             = useState({ company: "", phone: "", email: "", cmrs: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError]   = useState("");

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mount portal on open; unmount after close animation finishes (250 ms)
  useEffect(() => {
    if (open) {
      setRendered(true);
      setGated(true);
      setForm({ company: "", phone: "", email: "", cmrs: "" });
      setFormError("");
    } else {
      const t = setTimeout(() => setRendered(false), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company.trim() || !form.email.trim() || !form.phone.trim()) {
      setFormError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
    }).catch(() => {});
    await new Promise((r) => setTimeout(r, 300));
    setSubmitting(false);
    setGated(false);
  };

  if (!mounted || !rendered || !data) return null;

  const d = data as Record<string, unknown>;
  const sn = (d.sender as Record<string, string>) || {};
  const cn = (d.consignee as Record<string, string>) || {};

  const docDate = !isNL(d.document_date) ? String(d.document_date) : "";
  const pickupDate = !isNL(d.pickup_date) ? String(d.pickup_date) : "";
  const subtitle = [docDate, pickupDate].filter(Boolean).join("  ·  ");

  const str = (k: string) => d[k] as string | undefined;

  return createPortal(
    <>
      <style>{`
        @media (max-width: 639px) {
          .cmr-field-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      {/* Backdrop */}
      <div
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          background: open ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
          pointerEvents: open ? "auto" : "none",
          transition: "background 0.2s",
        }}
      />

      {/* Floating card — centred with visible site behind */}
      <div
        style={{
          position: "fixed",
          top:    isMobile ? "2vh" : "4vh",
          left:   isMobile ? "3vw" : "4vw",
          right:  isMobile ? "3vw" : "4vw",
          bottom: isMobile ? "2vh" : "4vh",
          zIndex: 301,
          background: "#0F1115",
          border: "1px solid #2D3038",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(0.97)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: open ? "auto" : "none",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px",
            borderBottom: "1px solid #2D3038",
            flexShrink: 0,
            background: "#1C1E24",
            borderRadius: "14px 14px 0 0",
            position: "relative",
          }}
        >
          {/* spacer so close button pushes to the right */}
          <div style={{ width: 30 }} />

          {/* Centered title */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
              CMR Document
            </div>
            {subtitle && (
              <div style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: 3, fontWeight: 600 }}>
                {subtitle}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              border: "1px solid #2D3038",
              background: "transparent",
              color: "#9CA3AF",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0, position: "relative" }}>

          {/* Gate overlay — sits above blurred content */}
          {gated && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(15,17,21,0.6)",
                backdropFilter: "blur(2px)",
                overflowY: "auto",
                padding: isMobile ? "16px 0" : 0,
              }}
            >
              <form
                onSubmit={handleGateSubmit}
                style={{
                  background: "#1C1E24",
                  border: "1px solid #2D3038",
                  borderRadius: 12,
                  padding: isMobile ? "20px 16px 18px" : "28px 28px 24px",
                  width: "100%",
                  maxWidth: isMobile ? "94%" : 380,
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? 10 : 14,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                  flexShrink: 0,
                }}
              >
                <div style={{ textAlign: "center", marginBottom: isMobile ? 2 : 4 }}>
                  <div style={{ fontSize: isMobile ? "0.92rem" : "1rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                    Your results are ready
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#9CA3AF", lineHeight: 1.4 }}>
                    Enter your details to unlock the full extraction.
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: "0.64rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>Company Name *</label>
                  <input
                    type="text"
                    placeholder="Acme Logistics"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    style={inputBase}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: "0.64rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    style={inputBase}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: "0.64rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>Work Email *</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    style={inputBase}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: "0.64rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>Fleet size</label>
                  <select
                    value={form.cmrs}
                    onChange={(e) => setForm((f) => ({ ...f, cmrs: e.target.value }))}
                    style={{ ...inputBase, appearance: "none", cursor: "pointer" } as React.CSSProperties}
                  >
                    <option value="">Select range…</option>
                    <option value="1-5">1 – 5 vehicles</option>
                    <option value="6-20">6 – 20 vehicles</option>
                    <option value="21-50">21 – 50 vehicles</option>
                    <option value="50+">50+ vehicles</option>
                  </select>
                </div>

                {formError && (
                  <div style={{ fontSize: "0.76rem", color: "#f87171" }}>{formError}</div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    border: "none",
                    background: "#DFFF00",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                    transition: "opacity 0.15s",
                  }}
                >
                  {submitting ? "Unlocking…" : "Show my results →"}
                </button>

                <div style={{ fontSize: "0.68rem", color: "#4B5563", textAlign: "center" }}>
                  No spam. Used only to contact you about CMRSync.
                </div>
              </form>
            </div>
          )}

          {/* Photo column — desktop only */}
          {!isMobile && (
          <div
            style={{
              width: "50%",
              flexShrink: 0,
              background: "#000",
              borderRight: "1px solid #2D3038",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 12,
              overflow: "hidden",
              filter: gated ? "blur(7px)" : "none",
              transition: "filter 0.4s ease",
              userSelect: gated ? "none" : "auto",
            } as React.CSSProperties}
          >
            {previewUrl ? (
              <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={previewUrl}
                  alt="CMR scan"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 4, display: "block" }}
                />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, color: "#4B5563", fontSize: "0.78rem" }}>
                <FileText size={28} strokeWidth={1.2} />
                <span>No image</span>
              </div>
            )}
          </div>
          )}

          {/* Fields column — scrollable */}
          <div
            style={{
              flex: 1,
              overflowY: gated ? "hidden" : "auto",
              padding: 0,
              scrollbarWidth: "thin",
              scrollbarColor: "#DFFF00 #1C1E24",
              filter: gated ? "blur(7px)" : "none",
              transition: "filter 0.4s ease",
              userSelect: gated ? "none" : "auto",
              pointerEvents: gated ? "none" : "auto",
              display: "flex",
              flexDirection: "column",
            } as React.CSSProperties}
          >
            {/* Field content */}
            <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "14px 14px" : "20px 26px" }}>
            <Section title="Sender (Field 1)">
              <Field fieldKey="sender_name" label="Name" val={sn.name} />
              <Field fieldKey="sender_country" label="Country" val={sn.country} />
              <Field fieldKey="sender_address" label="Address" val={sn.address} span />
            </Section>

            <Section title="Consignee / Receiver (Field 2)">
              <Field fieldKey="consignee_name" label="Name" val={cn.name} />
              <Field fieldKey="consignee_country" label="Country" val={cn.country} />
              <Field fieldKey="consignee_address" label="Address" val={cn.address} span />
            </Section>

            <Section title="Carrier (Fields 16 & 17)">
              <Field fieldKey="carrier_name" label="Carrier Name & Address" val={str("carrier_name")} span />
              <Field fieldKey="following_carriers" label="Following Carriers" val={str("following_carriers")} span />
            </Section>

            <Section title="Driver">
              <Field fieldKey="driver_name" label="Driver Name" val={str("driver_name")} />
              <Field fieldKey="truck_plate" label="Truck Plate" val={str("truck_plate")} />
            </Section>

            <Section title="Transport">
              <Field fieldKey="place_of_delivery" label="Place of Delivery" val={str("place_of_delivery")} />
              <Field fieldKey="pickup_location" label="Pickup Location" val={str("pickup_location")} />
              <Field fieldKey="pickup_date" label="Pickup Date" val={str("pickup_date")} />
            </Section>

            <Section title="Goods">
              <Field fieldKey="goods_description" label="Description" val={str("goods_description")} span multiline />
              <Field fieldKey="gross_weight_kg" label="Gross Weight (kg)" val={str("gross_weight_kg")} />
              <Field fieldKey="volume_m3" label="Volume (m³)" val={str("volume_m3")} />
            </Section>

            <Section title="Customs & Terms">
              <Field fieldKey="document_date" label="Document Date" val={str("document_date")} />
              <Field fieldKey="shipping_terms" label="Incoterms / Shipping Terms" val={str("shipping_terms")} />
              <Field fieldKey="stamp_date" label="Stamp Date" val={str("stamp_date")} />
            </Section>

            <Section title="Contacts">
              <Field fieldKey="ship_name" label="Ship / Vessel Name" val={str("ship_name")} />
              <Field fieldKey="contact_person" label="Contact Person" val={str("contact_person")} />
              <Field fieldKey="contact_info" label="Phone / Email" val={str("contact_info")} span />
            </Section>
            {/* Mobile-only photo — scrolls with content at the bottom */}
            {isMobile && previewUrl && (
              <div
                style={{
                  marginTop: 16,
                  borderTop: "1px solid #2D3038",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#000",
                }}
              >
                <img
                  src={previewUrl}
                  alt="CMR scan"
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "contain",
                    opacity: 0.9,
                  }}
                />
              </div>
            )}
            </div>{/* end inner scrollable */}
          </div>{/* end fields column */}
        </div>{/* end body */}

        {/* Footer */}
        <div
          style={{
            padding: "14px 22px",
            borderTop: "1px solid #2D3038",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#1C1E24",
            borderRadius: "0 0 14px 14px",
          }}
        >
          <style>{`
            @keyframes cmr-glow-pulse {
              0%, 100% { box-shadow: 0 0 14px rgba(223,255,0,0.35), 0 2px 8px rgba(0,0,0,0.35); }
              50%       { box-shadow: 0 0 32px rgba(223,255,0,0.75), 0 0 60px rgba(223,255,0,0.35), 0 2px 12px rgba(0,0,0,0.4); }
            }
          `}</style>
          <button
            data-cal-link="cmrsync/onboarding-call"
            data-cal-namespace="onboarding-call"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            onClick={onClose}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 28px",
              borderRadius: 8,
              border: "none",
              background: "#DFFF00",
              color: "#000",
              fontSize: "0.88rem",
              fontWeight: 700,
              cursor: "pointer",
              animation: "cmr-glow-pulse 1.6s ease-in-out infinite",
            }}
          >
            Start Free Trial <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
