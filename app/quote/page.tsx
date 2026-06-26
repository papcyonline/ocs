import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Cleaning Quote",
  description:
    "Tell us about your space — residential, commercial, or post-construction — and book your spot. Serving greater Louisville, KY.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="flex h-[100dvh] flex-col bg-white">
        <div className="h-20 shrink-0 sm:h-24" aria-hidden />
        <div className="min-h-0 flex-1">
          <QuoteForm />
        </div>
      </main>
    </>
  );
}
