import logoSrc from "@/assets/cmrsync-logo.png";

export function Logo({
  className = "",
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="CMRsync logo"
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
    </div>
  );
}
