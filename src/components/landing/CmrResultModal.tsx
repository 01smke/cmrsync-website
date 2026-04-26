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

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function Field({
  label,
  fieldKey,
  val,
  span,
}: {
  label: string;
  fieldKey: string;
  val: unknown;
  span?: boolean;
}) {
  const empty = isNL(val);
  const neon = NEON_KEYS.has(fieldKey) && !empty;
  const display = empty ? "—" : String(val);
  return (
    <div
      style={{ gridColumn: span ? "1 / -1" : undefined, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <div
        style={{
          fontSize: "0.59rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#6B7280",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "0.78rem",
          color: empty ? "#4B5563" : neon ? "#DFFF00" : "#e5e7eb",
          fontStyle: empty ? "italic" : "normal",
          fontWeight: neon ? 600 : 400,
          background: "#0F1115",
          border: `1px solid ${neon ? "rgba(223,255,0,0.18)" : empty ? "rgba(251,191,36,0.12)" : "#2D3038"}`,
          borderRadius: 5,
          padding: "5px 9px",
          minHeight: 28,
          wordBreak: "break-word",
          lineHeight: 1.4,
        }}
      >
        {display}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontSize: "0.58rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#DFFF00",
          opacity: 0.9,
          marginBottom: 7,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function CmrResultModal({ open, data, previewUrl, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!mounted || !data) return null;

  const d = data as Record<string, Record<string, string> & string>;
  const sn = (d.sender as Record<string, string>) || {};
  const cn = (d.consignee as Record<string, string>) || {};

  const docDate = !isNL(d.document_date) ? String(d.document_date) : "";
  const pickupDate = !isNL(d.pickup_date) ? String(d.pickup_date) : "";
  const subtitle = [docDate, pickupDate].filter(Boolean).join("  ·  ");

  return createPortal(
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "opacity 0.2s ease",
      }}
    >
      <div
        style={{
          background: "#1C1E24",
          border: "1px solid #2D3038",
          borderRadius: 14,
          width: "100%",
          maxWidth: 640,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03) inset",
          transform: open ? "translateY(0) scale(1)" : "translateY(14px) scale(0.98)",
          transition: "transform 0.22s ease, opacity 0.22s ease",
          opacity: open ? 1 : 0,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px 13px",
            borderBottom: "1px solid #2D3038",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                background: "rgba(74,222,128,0.12)",
                color: "#4ade80",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: 5,
                padding: "2px 8px",
                fontSize: "0.66rem",
                fontWeight: 700,
              }}
            >
              Extracted
            </span>
            <div>
              <div
                style={{
                  fontSize: "0.97rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                CMR Document
              </div>
              {subtitle && (
                <div style={{ fontSize: "0.71rem", color: "#9CA3AF", marginTop: 2 }}>
                  {subtitle}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid #2D3038",
              background: "transparent",
              color: "#6B7280",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
          {/* Photo col */}
          <div
            style={{
              width: 180,
              flexShrink: 0,
              background: "#000",
              borderRight: "1px solid #2D3038",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              position: "relative",
            }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="CMR scan"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 4 }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  color: "#4B5563",
                  fontSize: "0.75rem",
                  textAlign: "center",
                }}
              >
                <FileText size={26} strokeWidth={1.3} />
                No image
              </div>
            )}
          </div>

          {/* Fields col */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 18px",
              scrollbarWidth: "thin",
              scrollbarColor: "#DFFF00 #1C1E24",
            }}
          >
            <Section title="Sender">
              <Field fieldKey="sender_name" label="Name" val={sn.name} />
              <Field fieldKey="sender_country" label="Country" val={sn.country} />
              <Field fieldKey="sender_address" label="Address" val={sn.address} span />
            </Section>

            <Section title="Consignee / Receiver">
              <Field fieldKey="consignee_name" label="Name" val={cn.name} />
              <Field fieldKey="consignee_country" label="Country" val={cn.country} />
              <Field fieldKey="consignee_address" label="Address" val={cn.address} span />
            </Section>

            <Section title="Driver">
              <Field fieldKey="driver_name" label="Driver Name" val={d.driver_name as unknown as string} />
              <Field fieldKey="truck_plate" label="Truck Plate" val={d.truck_plate as unknown as string} />
            </Section>

            <Section title="Transport">
              <Field fieldKey="place_of_delivery" label="Place of Delivery" val={d.place_of_delivery as unknown as string} />
              <Field fieldKey="pickup_location" label="Pickup Location" val={d.pickup_location as unknown as string} />
              <Field fieldKey="pickup_date" label="Pickup Date" val={d.pickup_date as unknown as string} />
            </Section>

            <Section title="Goods">
              <Field fieldKey="goods_description" label="Description" val={d.goods_description as unknown as string} span />
              <Field fieldKey="gross_weight_kg" label="Gross Weight (kg)" val={d.gross_weight_kg as unknown as string} />
              <Field fieldKey="volume_m3" label="Volume (m³)" val={d.volume_m3 as unknown as string} />
            </Section>

            <Section title="Customs & Terms">
              <Field fieldKey="document_date" label="Document Date" val={d.document_date as unknown as string} />
              <Field fieldKey="shipping_terms" label="Shipping Terms" val={d.shipping_terms as unknown as string} />
              <Field fieldKey="stamp_date" label="Stamp Date" val={d.stamp_date as unknown as string} />
            </Section>

            <Section title="Contacts">
              <Field fieldKey="ship_name" label="Vessel Name" val={d.ship_name as unknown as string} />
              <Field fieldKey="contact_person" label="Contact Person" val={d.contact_person as unknown as string} />
              <Field fieldKey="contact_info" label="Phone / Email" val={d.contact_info as unknown as string} span />
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "11px 18px",
            borderTop: "1px solid #2D3038",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "#9CA3AF", lineHeight: 1.4 }}>
            <strong style={{ color: "#fff" }}>This is what your dashboard looks like for every CMR.</strong>
            <br />
            Unlimited scans, PDF invoices, bundle export — from €49/mo.
          </div>
          <a
            href="#pricing"
            onClick={onClose}
            style={{
              background: "#DFFF00",
              color: "#000",
              fontWeight: 700,
              fontSize: "0.8rem",
              border: "none",
              borderRadius: 7,
              padding: "8px 16px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              textDecoration: "none",
              boxShadow: "0 0 16px rgba(223,255,0,0.22)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Start Free Trial <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
