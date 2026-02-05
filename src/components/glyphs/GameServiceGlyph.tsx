export default function GameServiceGlyph({ size = 72, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" className={className}>
      <circle cx="36" cy="36" r="28" stroke="url(#grad1)" strokeWidth="2" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="6s" repeatCount="indefinite" />
      </circle>

      <path d="M30 26 L48 36 L30 46 Z" fill="url(#grad1)" opacity="0.9">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </path>

      <g>
        <circle cx="18" cy="24" r="4" fill="url(#grad1)" opacity="0.8" />
        <circle cx="54" cy="30" r="4" fill="url(#grad1)" opacity="0.8" />
        <circle cx="22" cy="50" r="4" fill="url(#grad1)" opacity="0.8" />

        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 36 36"
          to="360 36 36"
          dur="12s"
          repeatCount="indefinite"
        />
      </g>

      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="72" y2="72">
          <stop offset="0%" stopColor="#8AB4FF" />
          <stop offset="100%" stopColor="#D7AAFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
