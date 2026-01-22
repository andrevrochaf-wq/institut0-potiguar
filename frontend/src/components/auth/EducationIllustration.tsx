export default function EducationIllustration() {
  return (
    <svg
      className="ip-illustration"
      viewBox="0 0 360 240"
      role="img"
      aria-label="Ilustracao educacional"
    >
      <defs>
        <linearGradient id="ipBook" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E4DB7" />
          <stop offset="100%" stopColor="#1FA66A" />
        </linearGradient>
      </defs>
      <rect x="16" y="24" width="328" height="192" rx="28" fill="#f4efe7" stroke="#e6e0d8" />
      <path
        d="M66 150c16-16 40-24 72-24h70c32 0 56 8 72 24"
        stroke="#c9c0b4"
        strokeWidth="6"
        fill="none"
      />
      <rect x="78" y="70" width="86" height="54" rx="10" fill="url(#ipBook)" />
      <rect x="86" y="78" width="70" height="8" rx="4" fill="#ffffff" opacity="0.9" />
      <rect x="86" y="92" width="54" height="6" rx="3" fill="#ffffff" opacity="0.7" />
      <circle cx="226" cy="86" r="20" fill="#1E4DB7" opacity="0.2" />
      <circle cx="254" cy="86" r="20" fill="#1FA66A" opacity="0.2" />
      <circle cx="240" cy="110" r="20" fill="#D83A3A" opacity="0.2" />
      <path
        d="M206 148c8-18 24-28 48-28 24 0 40 10 48 28"
        stroke="#1E4DB7"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
