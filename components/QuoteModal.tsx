"use client";

import { useEffect, useState } from "react";
import {
  X,
  House,
  Buildings,
  HardHat,
  Check,
  CheckCircle,
} from "@phosphor-icons/react";
import { useQuoteModal } from "./QuoteModalContext";
import { AnimatedArrow } from "./icons";
import { sendQuoteRequest, type ContactResult } from "@/lib/actions";

const SERVICES = [
  { id: "Residential", icon: House, blurb: "Homes & apartments" },
  { id: "Commercial", icon: Buildings, blurb: "Offices & shared spaces" },
  { id: "Post-Construction", icon: HardHat, blurb: "New builds & renovations" },
] as const;

const SIZES = [
  "Under 1,500 sqft",
  "1,500 – 3,500 sqft",
  "3,500 – 8,000 sqft",
  "Over 8,000 sqft",
];

const TIMINGS = [
  "As soon as possible",
  "Within 2 weeks",
  "Within a month",
  "Flexible",
];

const FREQUENCIES = ["One-time", "Weekly", "Bi-weekly", "Monthly"];

type FormData = {
  service: string;
  size: string;
  timing: string;
  frequency: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  message: string;
};

const EMPTY: FormData = {
  service: "",
  size: "",
  timing: "",
  frequency: "",
  name: "",
  email: "",
  phone: "",
  zip: "",
  message: "",
};

const inputClass =
  "w-full rounded-2xl bg-neutral-100 px-5 py-4 text-base text-black placeholder:text-neutral-500 outline-none transition focus:bg-white focus:ring-2 focus:ring-oranje-500";

export function QuoteModal() {
  const { isOpen, close } = useQuoteModal();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ContactResult | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function handleClose() {
    close();
    setTimeout(() => {
      setStep(1);
      setData(EMPTY);
      setResult(null);
      setSubmitting(false);
    }, 300);
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function canAdvance() {
    if (step === 1) return !!data.service;
    if (step === 2) return !!data.size && !!data.timing && !!data.frequency;
    return false;
  }

  function canSubmit() {
    return !!data.name && !!data.email && !!data.phone;
  }

  async function handleSubmit() {
    if (!canSubmit() || submitting) return;
    setSubmitting(true);
    const fd = new FormData();
    (Object.keys(data) as Array<keyof FormData>).forEach((k) => {
      fd.append(k, data[k]);
    });
    const res = await sendQuoteRequest(null, fd);
    setResult(res);
    setSubmitting(false);
  }

  if (!isOpen) return null;

  const success = result && result.success;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Get a free quote"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white sm:max-w-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between px-6 pt-5 sm:px-8 sm:pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            {success ? "Sent" : `Step ${step} of 3`}
          </p>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="-mr-2 p-2 text-neutral-500 transition hover:text-black"
          >
            <X weight="bold" className="h-6 w-6" />
          </button>
        </div>

        {!success && (
          <div className="mx-6 mt-4 sm:mx-8">
            <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-oranje-500 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
          {success ? (
            <div className="flex flex-col items-start py-6">
              <CheckCircle
                weight="fill"
                className="h-12 w-12 text-oranje-500"
              />
              <h2 className="mt-6 font-display text-3xl tracking-tight text-black sm:text-4xl">
                Thanks — we&rsquo;ve got it.
              </h2>
              <p className="mt-4 text-base text-neutral-700">
                We&rsquo;ll be in touch at{" "}
                <span className="font-medium text-black">{data.email}</span>{" "}
                within 2 business days. Check your inbox for a confirmation.
              </p>
              <p className="mt-3 text-sm text-neutral-600">
                For anything urgent, call{" "}
                <a
                  href="tel:+15023907925"
                  className="font-medium text-oranje-600 underline underline-offset-2"
                >
                  502-390-7925
                </a>
                .
              </p>
              {result && "preview" in result && result.preview && (
                <p className="mt-5 text-xs text-neutral-500">
                  Preview mode — set <code>RESEND_API_KEY</code> in{" "}
                  <code>.env.local</code> to send real email.
                </p>
              )}
            </div>
          ) : step === 1 ? (
            <Step1 service={data.service} onPick={(v) => update("service", v)} />
          ) : step === 2 ? (
            <Step2 data={data} update={update} />
          ) : (
            <Step3 data={data} update={update} />
          )}

          {result && !result.success && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {result.error}
            </p>
          )}
        </div>

        {!success && (
          <>
            <div className="h-px w-full bg-neutral-100" />
            <div className="flex items-center justify-between gap-3 px-6 py-4 sm:px-8">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
              >
                Back
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canAdvance()}
                  className="group inline-flex items-center gap-2 rounded-full bg-oranje-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-oranje-600 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
                >
                  Next
                  <AnimatedArrow className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit() || submitting}
                  className="group inline-flex items-center gap-2 rounded-full bg-oranje-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-oranje-600 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
                >
                  {submitting ? "Sending…" : "Send request"}
                  <AnimatedArrow className="h-5 w-5" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Step1({
  service,
  onPick,
}: {
  service: string;
  onPick: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl tracking-tight text-black sm:text-3xl">
        What do you need?
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        Pick the service that best matches your space.
      </p>

      <div className="mt-6 grid gap-3">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          const selected = service === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onPick(s.id)}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition ${
                selected
                  ? "bg-oranje-50 ring-2 ring-oranje-500"
                  : "bg-neutral-100 hover:bg-neutral-200"
              }`}
            >
              <Icon
                weight="bold"
                className={`h-8 w-8 shrink-0 ${
                  selected ? "text-oranje-600" : "text-neutral-700"
                }`}
              />
              <div className="flex-1">
                <p className="font-display text-lg text-black">{s.id}</p>
                <p className="text-sm text-neutral-600">{s.blurb}</p>
              </div>
              {selected && (
                <Check weight="bold" className="h-5 w-5 text-oranje-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step2({
  data,
  update,
}: {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl tracking-tight text-black sm:text-3xl">
          A few details.
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Helps us price your quote accurately.
        </p>
      </div>

      <Field label="Approximate size">
        <OptionGrid
          options={SIZES}
          value={data.size}
          onPick={(v) => update("size", v)}
        />
      </Field>

      <Field label="When do you need it?">
        <OptionGrid
          options={TIMINGS}
          value={data.timing}
          onPick={(v) => update("timing", v)}
        />
      </Field>

      <Field label="Frequency">
        <OptionGrid
          options={FREQUENCIES}
          value={data.frequency}
          onPick={(v) => update("frequency", v)}
        />
      </Field>
    </div>
  );
}

function Step3({
  data,
  update,
}: {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl tracking-tight text-black sm:text-3xl">
        Your info.
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        We&rsquo;ll reach out within 2 business days.
      </p>

      <div className="mt-6 space-y-3">
        <input
          name="name"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          required
          placeholder="Your name"
          className={inputClass}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            required
            placeholder="Email"
            className={inputClass}
          />
          <input
            name="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
            placeholder="Phone"
            className={inputClass}
          />
        </div>
        <input
          name="zip"
          value={data.zip}
          onChange={(e) => update("zip", e.target.value)}
          placeholder="ZIP (optional)"
          className={inputClass}
        />
        <textarea
          name="message"
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          placeholder="Anything else we should know? (optional)"
          className={`${inputClass} resize-none`}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-black">{label}</p>
      {children}
    </div>
  );
}

function OptionGrid({
  options,
  value,
  onPick,
}: {
  options: readonly string[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onPick(opt)}
            className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
              selected
                ? "bg-oranje-50 font-medium text-oranje-700 ring-2 ring-oranje-500"
                : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
