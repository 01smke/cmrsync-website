type IconProps = { size?: number; color?: string };

const C = "#DFFF00";
const sw = 1.6;

export const IconTelegram = ({ size = 22, color = C }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M3.5 11.5 20 4.5l-3 15-5.2-3.6L9 19.5v-4l8-8-9.5 6.7-4-1Z"
      stroke={color}
      strokeWidth={sw}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export const IconAIVision = ({ size = 22, color = C }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
      stroke={color}
      strokeWidth={sw}
    />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={sw} />
    <path d="M12 9.5v.5M12 14v.5" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </svg>
);

export const IconDashboard = ({ size = 22, color = C }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="3" width="8" height="10" rx="1.5" stroke={color} strokeWidth={sw} />
    <rect x="13" y="3" width="8" height="6" rx="1.5" stroke={color} strokeWidth={sw} />
    <rect x="13" y="11" width="8" height="10" rx="1.5" stroke={color} strokeWidth={sw} />
    <rect x="3" y="15" width="8" height="6" rx="1.5" stroke={color} strokeWidth={sw} />
  </svg>
);

export const IconInvoice = ({ size = 22, color = C }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 3h11l3 3v15l-2.5-1.5L14 21l-2.5-1.5L9 21l-2.5-1.5L5 21V3Z"
      stroke={color}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
    <path d="M9 9h8M9 13h8M9 17h5" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </svg>
);

export const IconExport = ({ size = 22, color = C }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
    />
    <path
      d="M12 4v12M7 9l5-5 5 5"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconShield = ({ size = 22, color = C }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 3 4 6v6c0 4.5 3.3 8.3 8 9 4.7-.7 8-4.5 8-9V6l-8-3Z"
      stroke={color}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
    <path d="m9 12 2 2 4-4" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTruck = ({ size = 22, color = C }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2" y="6" width="12" height="10" rx="1.5" stroke={color} strokeWidth={sw} />
    <path d="M14 9h4l3 3v4h-7V9Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    <circle cx="7" cy="18" r="2" stroke={color} strokeWidth={sw} />
    <circle cx="17" cy="18" r="2" stroke={color} strokeWidth={sw} />
  </svg>
);

export const IconBolt = ({ size = 22, color = C }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
      stroke={color}
      strokeWidth={sw}
      strokeLinejoin="round"
      fill="rgba(223,255,0,0.08)"
    />
  </svg>
);
