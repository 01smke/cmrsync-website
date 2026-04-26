import logoSrc from "@/assets/cmrsync-logo.png";

export function Logo({
  className = "",
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  const rendered = Math.round(size * 1.55);
  const offset   = -Math.round((rendered - size) / 2);
  return (
    <div className={`flex items-center ${className}`} style={{ width: size, height: size, overflow: "hidden", flexShrink: 0 }}>
      <img
        src={logoSrc}
        alt="CMRSync logo"
        width={rendered}
        height={rendered}
        style={{
          width: rendered,
          height: rendered,
          display: "block",
          marginLeft: offset,
          marginTop: offset,
          flexShrink: 0,
        }}
      />
    </div>
  );
}
