"use client";

import type { ReactNode } from "react";
import { useQuoteModal } from "./QuoteModalContext";

type Props = {
  children: ReactNode;
  className?: string;
};

export function QuoteButton({ children, className }: Props) {
  const { open } = useQuoteModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
