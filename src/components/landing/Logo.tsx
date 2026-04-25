export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 700,
          fontSize: "20px",
          letterSpacing: "-0.02em",
          color: "#C8FF00",
        }}
      >
        CMRSYNC
      </span>
    </div>
  );
}
