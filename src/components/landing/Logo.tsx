import logoSrc from "@/assets/cmrsync-logo.png";

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
        backgroundSize: "148%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
