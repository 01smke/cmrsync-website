import logoSrc from "@/assets/cmrsync-logo.png";

export function Logo({
  className = "",
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={`flex items-center ${className}`} style={{ width: size, height: size, overflow: "hidden", flexShrink: 0 }}>
      <img
        src={logoSrc}
        alt="CMRSync logo"
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
