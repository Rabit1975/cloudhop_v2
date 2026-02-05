export default function YouTubeMusicGlyph({ size = 72, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" className={className}>
      <circle cx="36" cy="36" r="30" stroke="url(#grad2)" strokeWidth="1" opacity="0.25">
        <animate
          attributeName="opacity"
          values="0.15;0.35;0.15"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>

      <path d="M10 40 C20 20, 52 20, 62 40" stroke="url(#grad2)" strokeWidth="3" fill="none">
        <animate
          attributeName="d"
          dur="4s"
          repeatCount="indefinite"
          values="
            M10 40 C20 20, 52 20, 62 40;
            M10 38 C20 24, 52 24, 62 38;
            M10 40 C20 20, 52 20, 62 40
          "
        />
      </path>

      <rect x="30" y="22" width="4" height="20" rx="2" fill="url(#grad2)">
        <animate attributeName="height" values="20;28;20" dur="2.5s" repeatCount="indefinite" />
      </rect>

      <rect x="36" y="18" width="4" height="28" rx="2" fill="url(#grad2)">
        <animate attributeName="height" values="28;18;28" dur="2.5s" repeatCount="indefinite" />
      </rect>

      <rect x="42" y="22" width="4" height="20" rx="2" fill="url(#grad2)">
        <animate attributeName="height" values="20;30;20" dur="2.5s" repeatCount="indefinite" />
      </rect>

      <defs>
        <linearGradient id="grad2" x1="0" y1="0" x2="72" y2="72">
          <stop offset="0%" stopColor="#FF66CC" />
          <stop offset="100%" stopColor="#AA33FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
