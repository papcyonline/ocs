import Image from "next/image";
import logo from "@/Images/ocs-logo.png";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="OCS — Ottri Cleaning Services"
      placeholder="blur"
      priority
      sizes="(max-width: 640px) 140px, 180px"
      className={`h-10 w-auto sm:h-12 ${className ?? ""}`}
    />
  );
}
