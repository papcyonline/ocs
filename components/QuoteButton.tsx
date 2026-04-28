import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children: ReactNode;
  className?: string;
};

export function QuoteButton({ children, className }: Props) {
  return (
    <Link href="/quote" className={className}>
      {children}
    </Link>
  );
}
