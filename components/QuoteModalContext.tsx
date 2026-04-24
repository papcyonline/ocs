"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type QuoteModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextType | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <QuoteModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider");
  }
  return ctx;
}
