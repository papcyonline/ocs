"use client";

import { useActionState } from "react";
import { sendQuoteRequest, type ContactResult } from "@/lib/actions";
import { AnimatedArrow } from "@/components/icons";

const services = ["Residential", "Commercial", "Post-Construction"];

const inputClass =
  "w-full rounded-2xl bg-white px-5 py-4 text-base text-black placeholder:text-neutral-500 outline-none transition focus:ring-2 focus:ring-black";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<
    ContactResult | null,
    FormData
  >(sendQuoteRequest, null);

  if (state?.success) {
    return (
      <div className="rounded-3xl bg-white p-8 md:p-10">
        <p className="font-display text-2xl text-black md:text-3xl">
          Thanks — we&rsquo;ve got it.
        </p>
        <p className="mt-3 text-base text-neutral-700">
          We&rsquo;ll be in touch within 2 business days. For anything urgent,
          call <span className="font-semibold">502-390-7925</span>.
        </p>
        {state.preview && (
          <p className="mt-4 text-xs text-neutral-500">
            (Preview mode: set <code>RESEND_API_KEY</code> in{" "}
            <code>.env.local</code> to send real emails.)
          </p>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Your name"
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className={inputClass}
        />
      </div>
      <input
        name="phone"
        type="tel"
        placeholder="Phone (optional)"
        className={inputClass}
      />
      <select name="service" defaultValue="" className={inputClass}>
        <option value="" disabled>
          Service type
        </option>
        {services.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell us about your space"
        className={`${inputClass} resize-none`}
      />

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send request"}
          <AnimatedArrow className="h-5 w-5" />
        </button>
        {state?.success === false && (
          <p className="text-sm text-black">{state.error}</p>
        )}
      </div>
    </form>
  );
}
