type LogoProps = { className?: string };

export function GoogleLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Google"
    >
      <path
        fill="#4285F4"
        d="M21.5 12.25c0-.85-.07-1.66-.21-2.45H12v4.62h5.36c-.23 1.25-.94 2.31-2 3.02v2.51h3.23c1.89-1.74 2.97-4.31 2.97-7.7z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.7 0 4.96-.89 6.62-2.41l-3.23-2.51c-.9.6-2.05.95-3.39.95-2.6 0-4.81-1.76-5.6-4.13H3.06v2.59C4.71 19.3 8.13 21.5 12 21.5z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.4c-.2-.6-.31-1.24-.31-1.9s.11-1.3.31-1.9V7.01H3.06C2.39 8.36 2 9.88 2 11.5s.39 3.14 1.06 4.49l3.34-2.59z"
      />
      <path
        fill="#EA4335"
        d="M12 5.97c1.47 0 2.78.51 3.82 1.5l2.86-2.86C16.96 3.04 14.7 2 12 2 8.13 2 4.71 4.2 3.06 7.41l3.34 2.59c.79-2.37 3-4.13 5.6-4.13z"
      />
    </svg>
  );
}

export function YelpLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Yelp"
    >
      <rect width="24" height="24" rx="5" fill="#D32323" />
      <path
        fill="#ffffff"
        d="M11.4 6.2c.05-.55.46-.94 1-.83.62.13 2.05.6 2.96 1.05.5.25.6.85.27 1.27L13 10.6c-.4.5-1.18.27-1.27-.36-.13-.86-.34-2.84-.33-4.04zm5.5 4.2c.36-.08.74.1.83.46.13.55.34 1.6.33 2.36-.01.43-.42.7-.83.55l-2.78-1c-.5-.18-.5-.88 0-1.06l2.45-1.31zm-1.6 4.5c.32-.18.74-.05.85.3.18.5.46 1.42.55 2.05.06.42-.3.78-.74.7L13.2 17.4c-.55-.1-.66-.83-.18-1.1l2.27-1.4zM10.7 17c.46-.04.86.36.78.83-.1.6-.34 1.7-.6 2.36-.16.4-.66.5-.96.16l-1.83-2.04c-.36-.4-.13-1.05.4-1.13L10.7 17zm-3.36-3.42c-.27-.5.05-1.13.62-1.13l4.6.05c.6 0 .9.7.5 1.16L9.2 17.34c-.4.45-1.13.27-1.27-.31-.18-.78-.4-2.45-.6-3.46z"
      />
    </svg>
  );
}

export function BBBLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 36 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BBB Accredited Business"
    >
      <rect width="36" height="24" rx="3" fill="#005A8B" />
      <text
        x="18"
        y="11"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="7.5"
        fontWeight="800"
        fontFamily="ui-sans-serif, system-ui"
        letterSpacing="0.5"
      >
        BBB
      </text>
      <text
        x="18"
        y="20"
        textAnchor="middle"
        fill="#FFD100"
        fontSize="7.5"
        fontWeight="800"
        fontFamily="ui-sans-serif, system-ui"
      >
        A+
      </text>
    </svg>
  );
}
