import logoSrc from "@/assets/cmrsync-logo.png";

export function Logo({ className = "", size = 36 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoSrc}
        alt="CMRsync logo"
        width={size}
        height={size}
        className="logo-img"
        style={{ width: size, height: size, objectFit: "contain" }}
      />
      <span
        className="font-display"
        style={{
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#ffffff",
          fontSize: 18,
        }}
      >
        CMRsync
      </span>
    </div>
  );
}
