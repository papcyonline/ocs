import Image from "next/image";
import logoMark from "@/Images/OCS logo.png";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <Image
      src={logoMark}
      alt=""
      aria-hidden="true"
      placeholder="blur"
      priority
      className={className}
    />
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
  const subColor = tone === "dark" ? "text-neutral-500" : "text-white/70";

  return (
    <span className={`inline-flex items-center gap-0 ${className ?? ""}`}>
      <LogoMark className="h-12 w-auto shrink-0" />
      {showWordmark && (
        <span className="-ml-2 flex flex-col leading-none">
          <span
            className={`font-display-expanded text-xl font-extrabold tracking-tight sm:text-2xl ${wordColor}`}
          >
            OCS
          </span>
          {showSubtitle && (
            <span
              className={`-mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px] ${subColor}`}
            >
              Cleaning Services
            </span>
          )}
        </span>
      )}
    </span>
  );
}
