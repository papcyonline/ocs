"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";
import { tryReserveSlot } from "@/lib/bookings";

export type ContactResult =
  | { success: true; preview?: boolean }
  | { success: false; error: string };

type QuoteFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  size: string;
  timing: string;
  frequency: string;
  pets: string;
  entry: string;
  extras: string;
  date: string;
  time: string;
  message: string;
};

function parse(formData: FormData): QuoteFields {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    address: get("address"),
    service: get("service"),
    size: get("size"),
    timing: get("timing"),
    frequency: get("frequency"),
    pets: get("pets"),
    entry: get("entry"),
    extras: get("extras"),
    date: get("date"),
    time: get("time"),
    message: get("message"),
  };
}

function formatDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || "—";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeRange(time: string): string {
  if (!/^\d{2}:\d{2}$/.test(time)) return "—";
  const [h, m] = time.split(":").map(Number);
  const startMin = h * 60 + m;
  const endMin = startMin + 4 * 60;
  const fmt = (mins: number) => {
    const hh = Math.floor(mins / 60) % 24;
    const mm = mins % 60;
    const period = hh >= 12 ? "PM" : "AM";
    const display = hh % 12 === 0 ? 12 : hh % 12;
    return mm === 0
      ? `${display} ${period}`
      : `${display}:${mm.toString().padStart(2, "0")} ${period}`;
  };
  return `${fmt(startMin)} – ${fmt(endMin)}`;
}

function ocsPlain(q: QuoteFields) {
  return `New quote request from the OCS website.

CONTACT
  Name:    ${q.name}
  Email:   ${q.email}
  Phone:   ${q.phone}
  Address: ${q.address || "—"}

SERVICE
  Type:      ${q.service || "—"}
  Size:      ${q.size || "—"}
  Date:      ${formatDate(q.date)}
  Time:      ${formatTimeRange(q.time)}
  Timing:    ${q.timing || "—"}
  Frequency: ${q.frequency || "—"}
  Pets:      ${q.pets || "—"}
  Entry:     ${q.entry || "—"}
  Extras:    ${q.extras || "—"}

MESSAGE
${q.message || "—"}
`;
}

function ocsHtml(q: QuoteFields) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#737373;font-size:13px;">${k}</td><td style="padding:4px 0;color:#0a0a0a;font-size:14px;">${v || "—"}</td></tr>`;
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0a0a0a;max-width:560px;">
    <h2 style="margin:0 0 20px;font-size:22px;">New quote request</h2>
    <h3 style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#e55c00;">Contact</h3>
    <table style="border-collapse:collapse;margin-bottom:20px;">
      ${row("Name", q.name)}
      ${row("Email", q.email)}
      ${row("Phone", q.phone)}
      ${row("Address", q.address)}
    </table>
    <h3 style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#e55c00;">Service</h3>
    <table style="border-collapse:collapse;margin-bottom:20px;">
      ${row("Type", q.service)}
      ${row("Size", q.size)}
      ${row("Date", formatDate(q.date))}
      ${row("Time", formatTimeRange(q.time))}
      ${row("Timing", q.timing)}
      ${row("Frequency", q.frequency)}
      ${row("Pets", q.pets)}
      ${row("Entry", q.entry)}
      ${row("Extras", q.extras)}
    </table>
    ${q.message ? `<h3 style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#e55c00;">Message</h3><p style="white-space:pre-wrap;margin:0;font-size:14px;line-height:1.6;">${q.message}</p>` : ""}
  </div>`;
}

function userPlain(q: QuoteFields) {
  return `Hi ${q.name},

Thanks for reaching out to Ottri Cleaning Services. We've received your quote request and will be in touch within 2 business days with a personalized estimate.

Your request
  Service:   ${q.service || "—"}
  Size:      ${q.size || "—"}
  Date:      ${formatDate(q.date)}
  Time:      ${formatTimeRange(q.time)}
  Timing:    ${q.timing || "—"}
  Frequency: ${q.frequency || "—"}
  Pets:      ${q.pets || "—"}
  Entry:     ${q.entry || "—"}
  Extras:    ${q.extras || "—"}
  Address:   ${q.address || "—"}

For anything urgent, call 502-390-7925.

— The OCS team
Ottri Cleaning Services
Louisville, KY
`;
}

function userHtml(q: QuoteFields) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#737373;font-size:13px;">${k}</td><td style="padding:4px 0;color:#0a0a0a;font-size:14px;">${v || "—"}</td></tr>`;
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0a0a0a;max-width:560px;">
    <h2 style="margin:0 0 16px;font-size:22px;">Thanks, ${q.name} — we&rsquo;ve got it.</h2>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#404040;">We&rsquo;ll be in touch within 2 business days with a personalized estimate.</p>
    <h3 style="margin:20px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#e55c00;">Your request</h3>
    <table style="border-collapse:collapse;margin-bottom:20px;">
      ${row("Service", q.service)}
      ${row("Size", q.size)}
      ${row("Date", formatDate(q.date))}
      ${row("Time", formatTimeRange(q.time))}
      ${row("Timing", q.timing)}
      ${row("Frequency", q.frequency)}
      ${row("Pets", q.pets)}
      ${row("Entry", q.entry)}
      ${row("Extras", q.extras)}
      ${row("Address", q.address)}
    </table>
    <p style="margin:20px 0 0;font-size:14px;color:#404040;">For anything urgent, call <a href="tel:+15023907925" style="color:#e55c00;">502-390-7925</a>.</p>
    <p style="margin:24px 0 0;font-size:13px;color:#737373;">Ottri Cleaning Services · Louisville, KY</p>
  </div>`;
}

export async function sendQuoteRequest(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const q = parse(formData);

  if (!q.name || !q.email || !q.phone) {
    return {
      success: false,
      error: "Please fill in name, email, and phone.",
    };
  }

  if (!q.address) {
    return { success: false, error: "Please enter your service address." };
  }

  if (!q.date || !q.time) {
    return { success: false, error: "Please pick a date and time." };
  }

  try {
    const reserved = await tryReserveSlot(q.date, q.time);
    if (!reserved) {
      return {
        success: false,
        error: "That time just got booked. Please pick another.",
      };
    }
  } catch (e) {
    console.error("[bookings] reservation failed, continuing:", e);
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[Quote form — RESEND_API_KEY not set]\n" + ocsPlain(q));
    return { success: true, preview: true };
  }

  try {
    const resend = new Resend(apiKey);
    const from = "OCS <onboarding@resend.dev>";
    const subject = `New quote request — ${q.name}${q.service ? ` (${q.service})` : ""}`;

    const [toOcs, toUser] = await Promise.allSettled([
      resend.emails.send({
        from,
        to: site.emails,
        replyTo: q.email,
        subject,
        text: ocsPlain(q),
        html: ocsHtml(q),
      }),
      resend.emails.send({
        from,
        to: q.email,
        replyTo: "info@ottri.net",
        subject: "We've got your quote request",
        text: userPlain(q),
        html: userHtml(q),
      }),
    ]);

    const ocsOk =
      toOcs.status === "fulfilled" && !toOcs.value.error;
    const userOk =
      toUser.status === "fulfilled" && !toUser.value.error;

    if (!ocsOk) {
      const reason =
        toOcs.status === "rejected" ? toOcs.reason : toOcs.value.error;
      console.error("Resend OCS notification failed:", reason);
    }
    if (!userOk) {
      const reason =
        toUser.status === "rejected" ? toUser.reason : toUser.value.error;
      console.error("Resend customer confirmation failed:", reason);
    }

    if (!ocsOk) {
      return {
        success: false,
        error: "Could not send. Please call 502-390-7925 instead.",
      };
    }
    return { success: true };
  } catch (e) {
    console.error("Quote action threw:", e);
    return {
      success: false,
      error: "Could not send. Please call 502-390-7925 instead.",
    };
  }
}
