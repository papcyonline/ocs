"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";

export type ContactResult =
  | { success: true; preview?: boolean }
  | { success: false; error: string };

type QuoteFields = {
  name: string;
  email: string;
  phone: string;
  zip: string;
  service: string;
  size: string;
  timing: string;
  frequency: string;
  message: string;
};

function parse(formData: FormData): QuoteFields {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    zip: get("zip"),
    service: get("service"),
    size: get("size"),
    timing: get("timing"),
    frequency: get("frequency"),
    message: get("message"),
  };
}

function ocsPlain(q: QuoteFields) {
  return `New quote request from the OCS website.

CONTACT
  Name:  ${q.name}
  Email: ${q.email}
  Phone: ${q.phone}
  ZIP:   ${q.zip || "—"}

SERVICE
  Type:      ${q.service || "—"}
  Size:      ${q.size || "—"}
  Timing:    ${q.timing || "—"}
  Frequency: ${q.frequency || "—"}

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
      ${row("ZIP", q.zip)}
    </table>
    <h3 style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#e55c00;">Service</h3>
    <table style="border-collapse:collapse;margin-bottom:20px;">
      ${row("Type", q.service)}
      ${row("Size", q.size)}
      ${row("Timing", q.timing)}
      ${row("Frequency", q.frequency)}
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
  Timing:    ${q.timing || "—"}
  Frequency: ${q.frequency || "—"}

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
      ${row("Timing", q.timing)}
      ${row("Frequency", q.frequency)}
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

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[Quote form — RESEND_API_KEY not set]\n" + ocsPlain(q));
    return { success: true, preview: true };
  }

  try {
    const resend = new Resend(apiKey);
    const from = "OCS <onboarding@resend.dev>";
    const subject = `New quote request — ${q.name}${q.service ? ` (${q.service})` : ""}`;

    const [toOcs, toUser] = await Promise.all([
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

    if (toOcs.error || toUser.error) {
      console.error("Resend error:", toOcs.error ?? toUser.error);
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
