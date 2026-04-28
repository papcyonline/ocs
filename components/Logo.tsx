type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="20"
        cy="20"
        r="17"
        stroke="currentColor"
        strokeWidth="2.75"
      />
      <path
        d="M20 9.5 C20.6 14.4 22.6 17.4 27.5 18 C22.6 18.6 20.6 21.6 20 26.5 C19.4 21.6 17.4 18.6 12.5 18 C17.4 17.4 19.4 14.4 20 9.5 Z"
        fill="currentColor"
      />
      <circle cx="27" cy="26" r="1.6" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  showSubtitle?: boolean;
  tone?: "dark" | "light";
};

export function Logo({
  className,
  showWordmark = true,
  showSubtitle = false,
  tone = "dark",
}: LogoProps) {
  const wordColor = tone === "dark" ? "text-black" : "text-white";
  const subColor = tone === "dark" ? "text-neutral-500" : "text-white/60";

  return (
    <span className={`inline-flex items-baseline gap-2 ${className ?? ""}`}>
      <LogoMark className="h-7 w-7 shrink-0 self-center text-oranje-500" />
      {showWordmark && (
        <span
          className={`font-display-expanded text-xl tracking-tight ${wordColor}`}
        >
          OCS
        </span>
      )}
      {showSubtitle && (
        <span className={`hidden text-sm sm:inline ${subColor}`}>
          Ottri Cleaning Services
        </span>
      )}
    </span>
  );
}
