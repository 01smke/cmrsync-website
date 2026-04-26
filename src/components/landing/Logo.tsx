import logoSrc from "@/assets/cmrsync_logo_header_1777169303866.png";

export function Logo({
  className = "",
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`flex items-center ${className}`}
      role="img"
      aria-label="CMRSync logo"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        backgroundImage: `url(${logoSrc})`,
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
