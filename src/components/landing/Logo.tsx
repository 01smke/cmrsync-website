export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2" y="11" width="14" height="10" rx="1.5" stroke="#0a0a0a" strokeWidth="2" />
        <path
          d="M16 13h6l4 4v4h-10V13Z"
          stroke="#0a0a0a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="23" r="2.2" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
        <circle cx="21" cy="23" r="2.2" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
        <path
          d="M11 4 L7 12 L10 12 L8.5 18 L13 9 L10 9 L11 4 Z"
          fill="#C4F542"
          stroke="#0a0a0a"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-xl font-bold"
        style={{ letterSpacing: "-0.04em", color: "#0a0a0a", fontWeight: 900 }}
      >
        CMRsync
      </span>
    </div>
  );
}
