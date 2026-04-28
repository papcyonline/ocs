"use client";

import { useEffect, useRef, useState } from "react";
import {
  House,
  Buildings,
  HardHat,
  Check,
  CheckCircle,
  MapPin,
  CircleNotch,
  CaretLeft,
  CaretRight,
  PhoneCall,
  EnvelopeSimple,
  CalendarBlank,
  Clock,
} from "@phosphor-icons/react";
import { AnimatedArrow } from "./icons";
import { sendQuoteRequest, type ContactResult } from "@/lib/actions";
import { getBookedSlots } from "@/lib/bookings";

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

const SERVICE_STATES = ["Indiana", "Kentucky", "Ohio"] as const;

const STEPS = [
  { id: 1, label: "Service" },
  { id: 2, label: "Details" },
  { id: 3, label: "Date & Time" },
  { id: 4, label: "Your Info" },
] as const;

type FormData = {
  service: string;
  size: string;
  timing: string;
  frequency: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

const EMPTY: FormData = {
  service: "",
  size: "",
  timing: "",
  frequency: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

const TOTAL_STEPS = 4;

const OPEN_MIN = 8 * 60;
const CLOSE_MIN = 18 * 60;
const BOOKING_MIN = 4 * 60;
const SLOT_INCREMENT_MIN = 60;

const TIME_SLOTS: string[] = (() => {
  const out: string[] = [];
  for (let m = OPEN_MIN; m + BOOKING_MIN <= CLOSE_MIN; m += SLOT_INCREMENT_MIN) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    out.push(`${h.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`);
  }
  return out;
})();

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const display = h % 12 === 0 ? 12 : h % 12;
  return m === 0
    ? `${display} ${period}`
    : `${display}:${m.toString().padStart(2, "0")} ${period}`;
}

function formatTimeRange(t: string): string {
  if (!/^\d{2}:\d{2}$/.test(t)) return "";
  const start = timeToMinutes(t);
  const end = start + BOOKING_MIN;
  const endStr = `${Math.floor(end / 60)
    .toString()
    .padStart(2, "0")}:${(end % 60).toString().padStart(2, "0")}`;
  return `${formatTime(t)} – ${formatTime(endStr)}`;
}

function availableTimes(date: string, booked: Record<string, string[]>): string[] {
  const taken = booked[date] ?? [];
  const takenMins = taken.map(timeToMinutes);
  return TIME_SLOTS.filter((slot) => {
    const s = timeToMinutes(slot);
    return takenMins.every((t) => Math.abs(s - t) >= BOOKING_MIN);
  });
}

const inputClass =
  "w-full rounded-2xl bg-neutral-100 px-4 py-3 text-base text-black placeholder:text-neutral-500 outline-none transition focus:bg-white focus:ring-2 focus:ring-oranje-500";

function isStepComplete(step: number, data: FormData): boolean {
  if (step === 1) return !!data.service;
  if (step === 2) return !!data.size && !!data.timing && !!data.frequency;
  if (step === 3) return !!data.date && !!data.time;
  if (step === 4)
    return !!data.name && !!data.email && !!data.phone && !!data.address;
  return false;
}

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ContactResult | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  useEffect(() => {
    getBookedSlots().then(setBookedSlots).catch(() => setBookedSlots({}));
  }, []);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  const canAdvance = isStepComplete(step, data);
  const canSubmit =
    isStepComplete(4, data) && isStepComplete(3, data) && isStepComplete(2, data) && isStepComplete(1, data);

  async function handleSubmit() {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    const fd = new FormData();
    (Object.keys(data) as Array<keyof FormData>).forEach((k) => {
      fd.append(k, data[k]);
    });
    const res = await sendQuoteRequest(null, fd);
    setResult(res);
    setSubmitting(false);
    if (!res.success) {
      getBookedSlots().then(setBookedSlots).catch(() => {});
    }
  }

  const success = result && result.success;

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col px-5 sm:px-6">
      <div className="shrink-0 pt-3 pb-3 sm:pt-5 sm:pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
          {success ? "Request sent" : "Get your free quote"}
        </p>
        <h1 className="mt-1 font-display text-xl tracking-tight text-black sm:text-2xl md:text-3xl">
          {success ? "We've got it." : "Tell us about your space."}
        </h1>
      </div>

      {!success && (
        <div className="shrink-0 pb-4 sm:pb-5">
          <Stepper currentStep={step} data={data} onJump={setStep} />
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto pb-2 pt-1">
        {success ? (
          <SuccessPanel data={data} result={result} />
        ) : step === 1 ? (
          <Step1 service={data.service} onPick={(v) => update("service", v)} />
        ) : step === 2 ? (
          <Step2 data={data} update={update} />
        ) : step === 3 ? (
          <Step3Date
            date={data.date}
            time={data.time}
            bookedSlots={bookedSlots}
            onPickDate={(v) => {
              update("date", v);
              update("time", "");
            }}
            onPickTime={(v) => update("time", v)}
          />
        ) : (
          <Step4 data={data} update={update} />
        )}

        {result && !result.success && (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {result.error}
          </p>
        )}
      </div>

      {!success && (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-neutral-100 py-3 sm:py-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            Back
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance}
              className="group inline-flex items-center gap-2 rounded-full bg-oranje-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-oranje-600 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
            >
              Next
              <AnimatedArrow className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="group inline-flex items-center gap-2 rounded-full bg-oranje-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-oranje-600 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
            >
              {submitting ? "Sending…" : "Confirm booking"}
              <AnimatedArrow className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Stepper({
  currentStep,
  data,
  onJump,
}: {
  currentStep: number;
  data: FormData;
  onJump: (n: number) => void;
}) {
  const completedCount = STEPS.filter((s) => isStepComplete(s.id, data)).length;
  const progressPct = (completedCount / TOTAL_STEPS) * 100;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-xs text-neutral-600">
          {completedCount} of {TOTAL_STEPS} complete
        </p>
      </div>
      <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-oranje-500 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <ol className="grid grid-cols-4 gap-1 sm:gap-2">
        {STEPS.map((s) => {
          const complete = isStepComplete(s.id, data);
          const current = s.id === currentStep;
          const reachable =
            s.id === 1 ||
            STEPS.slice(0, s.id - 1).every((p) => isStepComplete(p.id, data));

          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => reachable && onJump(s.id)}
                disabled={!reachable}
                className={`group flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left transition sm:px-3 sm:py-2 ${
                  current
                    ? "bg-oranje-50"
                    : reachable
                      ? "hover:bg-neutral-50"
                      : "cursor-not-allowed opacity-50"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition ${
                    complete
                      ? "bg-oranje-500 text-white"
                      : current
                        ? "bg-white text-oranje-600 ring-2 ring-oranje-500"
                        : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {complete ? (
                    <Check weight="bold" className="h-3.5 w-3.5" />
                  ) : (
                    s.id
                  )}
                </span>
                <span
                  className={`hidden truncate text-[11px] font-semibold uppercase tracking-wider sm:inline ${
                    current
                      ? "text-oranje-700"
                      : complete
                        ? "text-neutral-700"
                        : "text-neutral-400"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function SuccessPanel({
  data,
  result,
}: {
  data: FormData;
  result: ContactResult | null;
}) {
  const firstName = data.name.trim().split(/\s+/)[0] || "there";
  return (
    <div className="mx-auto max-w-2xl py-2">
      <div className="flex items-center gap-3">
        <CheckCircle weight="fill" className="h-10 w-10 text-oranje-500" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
          You&rsquo;re on the calendar
        </p>
      </div>
      <h2 className="mt-3 font-display text-2xl tracking-tight text-black sm:text-3xl">
        Thanks, {firstName} — your spot is held.
      </h2>

      <dl className="mt-5 grid gap-2 rounded-2xl bg-neutral-50 p-4 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <CalendarBlank
            weight="bold"
            className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500"
          />
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Date
            </dt>
            <dd className="text-sm font-medium text-black">
              {formatLongDate(data.date)}
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock
            weight="bold"
            className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500"
          />
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Window
            </dt>
            <dd className="text-sm font-medium text-black">
              {formatTimeRange(data.time)}
            </dd>
          </div>
        </div>
      </dl>

      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-oranje-50 p-4">
        <PhoneCall
          weight="bold"
          className="mt-0.5 h-5 w-5 shrink-0 text-oranje-600"
        />
        <div>
          <p className="text-sm font-semibold text-oranje-800">
            Expect a call shortly
          </p>
          <p className="mt-1 text-sm text-oranje-900/80">
            A member of our team will call{" "}
            <span className="font-medium text-oranje-900">{data.phone}</span>{" "}
            within the next few minutes to confirm details and answer any
            questions.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 text-sm text-neutral-600">
        <EnvelopeSimple
          weight="bold"
          className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400"
        />
        <p>
          Confirmation sent to{" "}
          <span className="font-medium text-black">{data.email}</span>.
        </p>
      </div>

      <p className="mt-5 text-xs text-neutral-500">
        Need to reach us first? Call{" "}
        <a
          href="tel:+15023907925"
          className="font-medium text-oranje-600 underline underline-offset-2"
        >
          502-390-7925
        </a>
        .
      </p>

      {result && "preview" in result && result.preview && (
        <p className="mt-4 text-xs text-neutral-500">
          Preview mode — set <code>RESEND_API_KEY</code> in{" "}
          <code>.env.local</code> to send real email.
        </p>
      )}
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
      <h2 className="font-display text-lg tracking-tight text-black sm:text-xl">
        What do you need?
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Pick the service that best matches your space.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3 sm:gap-3">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          const selected = service === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onPick(s.id)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition sm:flex-col sm:items-start sm:gap-2 sm:px-5 sm:py-4 ${
                selected
                  ? "bg-oranje-50 ring-2 ring-oranje-500"
                  : "bg-neutral-100 hover:bg-neutral-200"
              }`}
            >
              <Icon
                weight="bold"
                className={`h-7 w-7 shrink-0 sm:h-8 sm:w-8 ${
                  selected ? "text-oranje-600" : "text-neutral-700"
                }`}
              />
              <div className="flex-1">
                <p className="font-display text-base text-black sm:text-lg">
                  {s.id}
                </p>
                <p className="text-xs text-neutral-600 sm:text-sm">
                  {s.blurb}
                </p>
              </div>
              {selected && (
                <Check
                  weight="bold"
                  className="h-5 w-5 shrink-0 text-oranje-600"
                />
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
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg tracking-tight text-black sm:text-xl">
          A few details.
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          Helps us tailor your quote.
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

function Step4({
  data,
  update,
}: {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-lg tracking-tight text-black sm:text-xl">
        Your info.
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        We&rsquo;ll reach out within 2 business days.
      </p>

      <div className="mt-4 space-y-2.5">
        <input
          name="name"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          required
          placeholder="Your name"
          className={inputClass}
        />
        <div className="grid gap-2.5 sm:grid-cols-2">
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
        <AddressAutocomplete
          value={data.address}
          onChange={(v) => update("address", v)}
        />
        <textarea
          name="message"
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          rows={3}
          placeholder="Anything else we should know? (optional)"
          className={`${inputClass} resize-none`}
        />
        <p className="text-xs text-neutral-500">
          We currently service Indiana, Kentucky, and Ohio.
        </p>
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
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function isoDate(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatLongDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function Step3Date({
  date,
  time,
  bookedSlots,
  onPickDate,
  onPickTime,
}: {
  date: string;
  time: string;
  bookedSlots: Record<string, string[]>;
  onPickDate: (v: string) => void;
  onPickTime: (v: string) => void;
}) {
  const today = startOfDay(new Date());
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<number | null> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const monthStart = new Date(year, month, 1);
  const todayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoBack = monthStart > todayMonth;

  const dayTimes = date ? availableTimes(date, bookedSlots) : [];
  const dateBookedTimes = date ? bookedSlots[date] ?? [] : [];

  return (
    <div>
      <h2 className="font-display text-lg tracking-tight text-black sm:text-xl">
        Pick a date & time.
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Each booking holds a 4-hour window. Dimmed times are taken.
      </p>

      <div className="mt-4 grid gap-5 md:grid-cols-2 md:gap-8">
        <div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setView(new Date(year, month - 1, 1))}
              disabled={!canGoBack}
              aria-label="Previous month"
              className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <CaretLeft weight="bold" className="h-5 w-5" />
            </button>
            <p className="font-display text-lg text-black">
              {MONTH_NAMES[month]} {year}
            </p>
            <button
              type="button"
              onClick={() => setView(new Date(year, month + 1, 1))}
              aria-label="Next month"
              className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-100"
            >
              <CaretRight weight="bold" className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            {WEEKDAYS.map((w, i) => (
              <div key={i} className="py-2">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <div key={i} className="h-9" />;
              const iso = isoDate(year, month, d);
              const cellDate = new Date(year, month, d);
              const isPast = cellDate < today;
              const isFull =
                !isPast && availableTimes(iso, bookedSlots).length === 0;
              const disabled = isPast || isFull;
              const selected = date === iso;
              const isToday = cellDate.getTime() === today.getTime();
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => !disabled && onPickDate(iso)}
                  disabled={disabled}
                  aria-label={`${MONTH_NAMES[month]} ${d}, ${year}${isFull ? " — full" : ""}`}
                  className={`flex h-9 flex-col items-center justify-center rounded-lg text-sm transition ${
                    selected
                      ? "bg-oranje-500 font-semibold text-white"
                      : disabled
                        ? "cursor-not-allowed text-neutral-300 line-through"
                        : isToday
                          ? "bg-oranje-50 font-medium text-oranje-700 hover:bg-oranje-100"
                          : "text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  <span>{d}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          {date ? (
            <>
              <p className="text-sm font-medium text-black">
                Available times — {formatLongDate(date)}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {TIME_SLOTS.map((slot) => {
                  const isTaken = !dayTimes.includes(slot);
                  const isBookedHere = dateBookedTimes.includes(slot);
                  const selected = time === slot;
                  const slotMin = timeToMinutes(slot);
                  const selectedMin = time ? timeToMinutes(time) : null;
                  const inWindow =
                    selectedMin !== null &&
                    !selected &&
                    slotMin > selectedMin &&
                    slotMin < selectedMin + BOOKING_MIN;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => !isTaken && onPickTime(slot)}
                      disabled={isTaken || inWindow}
                      className={`rounded-xl px-2 py-2 text-sm transition ${
                        selected
                          ? "bg-oranje-500 font-semibold text-white"
                          : inWindow
                            ? "cursor-not-allowed bg-oranje-100 text-oranje-700"
                            : isTaken
                              ? "cursor-not-allowed bg-neutral-100 text-neutral-400 line-through"
                              : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                      }`}
                      aria-label={`${formatTime(slot)}${
                        inWindow
                          ? " — part of your booking"
                          : isBookedHere
                            ? " — taken"
                            : ""
                      }`}
                    >
                      {formatTime(slot)}
                    </button>
                  );
                })}
              </div>
              {dayTimes.length === 0 && (
                <p className="mt-3 text-sm text-neutral-600">
                  No times available — please pick another date.
                </p>
              )}
              {time && (
                <p className="mt-4 rounded-2xl bg-oranje-50 px-4 py-3 text-sm text-oranje-800">
                  Booking{" "}
                  <span className="font-medium">{formatLongDate(date)}</span> ·{" "}
                  <span className="font-medium">{formatTimeRange(time)}</span>
                </p>
              )}
            </>
          ) : (
            <div className="flex h-full min-h-[180px] flex-col items-start justify-center rounded-2xl bg-neutral-50 px-5 py-6 text-sm text-neutral-600">
              Pick a date to see available time windows.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type Suggestion = {
  place_id: number;
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    suburb?: string;
    county?: string;
    state?: string;
    postcode?: string;
  };
};

function formatSuggestion(s: Suggestion): string {
  const a = s.address;
  const street = [a.house_number, a.road].filter(Boolean).join(" ");
  const locality =
    a.city || a.town || a.village || a.hamlet || a.suburb || a.county || "";
  const parts = [street, locality, a.state, a.postcode].filter(Boolean);
  return parts.join(", ");
}

function AddressAutocomplete({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const skipNextSearch = useRef(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }
    const q = query.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          format: "json",
          addressdetails: "1",
          countrycodes: "us",
          "accept-language": "en",
          limit: "8",
          q,
          viewbox: "-89.57,42.32,-80.52,36.50",
          bounded: "1",
        });
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`,
          { signal: ctrl.signal },
        );
        if (!res.ok) throw new Error("search failed");
        const raw = (await res.json()) as Suggestion[];
        const filtered = raw.filter(
          (r) =>
            r.address?.state &&
            (SERVICE_STATES as readonly string[]).includes(r.address.state),
        );
        setSuggestions(filtered);
        setOpen(true);
        setActiveIdx(-1);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => {
      ctrl.abort();
      clearTimeout(t);
    };
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function pick(s: Suggestion) {
    const formatted = formatSuggestion(s);
    skipNextSearch.current = true;
    setQuery(formatted);
    onChange(formatted);
    setOpen(false);
    setSuggestions([]);
    setActiveIdx(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      pick(suggestions[activeIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative">
        <MapPin
          weight="bold"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
        />
        <input
          name="address"
          type="text"
          value={query}
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
          }}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Address (Indiana, Kentucky, or Ohio)"
          className={`${inputClass} pl-12 pr-10`}
          required
        />
        {loading && (
          <CircleNotch
            weight="bold"
            className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-neutral-400"
          />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-2xl bg-white py-2 shadow-xl ring-1 ring-black/5"
        >
          {suggestions.map((s, i) => {
            const text = formatSuggestion(s);
            const active = i === activeIdx;
            return (
              <li
                key={s.place_id}
                role="option"
                aria-selected={active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(s);
                }}
                onMouseEnter={() => setActiveIdx(i)}
                className={`flex cursor-pointer items-start gap-3 px-4 py-2.5 text-sm ${
                  active ? "bg-oranje-50 text-oranje-800" : "text-neutral-800"
                }`}
              >
                <MapPin
                  weight="bold"
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    active ? "text-oranje-600" : "text-neutral-400"
                  }`}
                />
                <span>{text}</span>
              </li>
            );
          })}
        </ul>
      )}

      {open && !loading && suggestions.length === 0 && query.trim().length >= 3 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl bg-white px-4 py-3 text-sm text-neutral-600 shadow-xl ring-1 ring-black/5">
          No matches in our service area (IN, KY, OH).
        </div>
      )}
    </div>
  );
}
