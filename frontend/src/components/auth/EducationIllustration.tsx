export default function EducationIllustration() {
  return (
    <svg
      className="ip-illustration"
      viewBox="0 0 360 240"
      role="img"
      aria-label="Ilustracao educacional"
    >
      <defs>
        <linearGradient id="ipGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E4DB7" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#1FA66A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D83A3A" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect x="18" y="30" width="160" height="180" rx="18" fill="#ffffff" stroke="#E6E0D8" />
      <rect x="202" y="52" width="132" height="150" rx="16" fill="#ffffff" stroke="#E6E0D8" />
      <rect x="42" y="62" width="112" height="18" rx="8" fill="#0B1F3B" opacity="0.12" />
      <rect x="42" y="92" width="96" height="10" rx="5" fill="#0B1F3B" opacity="0.16" />
      <rect x="42" y="112" width="88" height="10" rx="5" fill="#0B1F3B" opacity="0.16" />
      <rect x="42" y="132" width="76" height="10" rx="5" fill="#0B1F3B" opacity="0.16" />

      <circle cx="248" cy="104" r="28" fill="url(#ipGrad)" opacity="0.85" />
      <path
        d="M238 106c6 6 18 6 24 0"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M234 118c8 8 28 8 36 0"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="222" y="140" width="76" height="14" rx="7" fill="#0B1F3B" opacity="0.12" />
      <rect x="222" y="160" width="64" height="10" rx="5" fill="#0B1F3B" opacity="0.16" />
      <rect x="222" y="176" width="54" height="10" rx="5" fill="#0B1F3B" opacity="0.16" />

      <rect x="102" y="190" width="160" height="16" rx="8" fill="#0B1F3B" opacity="0.08" />
    </svg>
  );
}
