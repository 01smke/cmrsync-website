export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        className="lime-glow"
        aria-hidden="true"
      >
        {/* truck body */}
        <rect x="2" y="11" width="14" height="10" rx="1.5" stroke="#DFFF00" strokeWidth="2" />
        <path
          d="M16 13h6l4 4v4h-10V13Z"
          stroke="#DFFF00"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="23" r="2.2" fill="#0F1115" stroke="#DFFF00" strokeWidth="2" />
        <circle cx="21" cy="23" r="2.2" fill="#0F1115" stroke="#DFFF00" strokeWidth="2" />
        {/* lightning bolt */}
        <path
          d="M11 4 L7 12 L10 12 L8.5 18 L13 9 L10 9 L11 4 Z"
          fill="#DFFF00"
        />
      </svg>
      <span
        className="text-xl font-display font-bold tracking-tight text-white"
        style={{ letterSpacing: "-0.03em" }}
      >
        CMRsync
      </span>
    </div>
  );
}
