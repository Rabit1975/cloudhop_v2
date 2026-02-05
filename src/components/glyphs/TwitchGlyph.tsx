export default function TwitchGlyph({ size = 72, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" className={className}>
      <path
        d="M36 12 L40 28 L56 32 L40 36 L36 52 L32 36 L16 32 L32 28 Z"
        fill="url(#grad3)"
        opacity="0.9"
      >
        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
      </path>

      <rect
        x="26"
        y="26"
        width="20"
        height="20"
        rx="3"
        stroke="url(#grad3)"
        strokeWidth="2"
        opacity="0.7"
      >
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
      </rect>

      <path d="M20 20 C28 12, 44 12, 52 20" stroke="url(#grad3)" strokeWidth="2" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
      </path>

      <path d="M20 52 C28 60, 44 60, 52 52" stroke="url(#grad3)" strokeWidth="2" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
      </path>

      <defs>
        <linearGradient id="grad3" x1="0" y1="0" x2="72" y2="72">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
