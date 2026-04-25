import logoSrc from "@/assets/cmrsync-logo.png";

export function Logo({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoSrc}
        alt="CMRSync logo"
        width={size}
        height={size}
        className="logo-img"
        style={{
          width: size,
          height: size,
          objectFit: "cover",
          display: "block",
          transform: "scale(1.7)",
          transformOrigin: "center",
        }}
      />
      <span
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 700,
          fontSize: "18px",
          letterSpacing: "-0.02em",
          color: "#ffffff",
          marginLeft: "14px",
        }}
      >
        CMRSYNC
      </span>
    </div>
  );
}
