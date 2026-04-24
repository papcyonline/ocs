import type { ReactNode } from "react";

type Props = {
  number: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({ number, title, children }: Props) {
  return (
    <section className="py-10 md:py-14">
      <div className="grid gap-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-medium text-oranje-600">
              {number}
            </span>
            <span className="h-px w-8 bg-oranje-500" />
          </div>
          <h2 className="mt-3 font-display text-2xl text-black md:text-3xl">
            {title}
          </h2>
        </div>
        <div className="md:col-span-8">
          <div className="prose-ocs">{children}</div>
        </div>
      </div>
    </section>
  );
}
