"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";

export type ContactResult =
  | { success: true; preview?: boolean }
  | { success: false; error: string };

export async function sendQuoteRequest(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in name, email, and message." };
  }

  const apiKey = process.env.RESEND_API_KEY;

  const body = `New quote request from the OCS website:

Name:    ${name}
Email:   ${email}
Phone:   ${phone || "—"}
Service: ${service || "—"}

Message:
${message}
`;

  if (!apiKey) {
    console.log("[Contact form — RESEND_API_KEY not set]\n" + body);
    return { success: true, preview: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "OCS Website <onboarding@resend.dev>",
      to: site.emails,
      replyTo: email,
      subject: `New quote request — ${name}${service ? ` (${service})` : ""}`,
      text: body,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Could not send. Please call 502-390-7925 instead.",
      };
    }
    return { success: true };
  } catch (e) {
    console.error("Contact action threw:", e);
    return {
      success: false,
      error: "Could not send. Please call 502-390-7925 instead.",
    };
  }
}
