import { site, absoluteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { locations } from "@/lib/locations";

// Serves /llms-full.txt — the expanded companion to /llms.txt, with the full
// content of every service and service-area page inlined so an LLM can ingest
// the whole site from one document.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name} — Full Content`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(
    `Locally owned, insured, bonded, and DBE certified. Serving ${site.serviceArea}. Phone: ${site.phone}. Email: ${site.emails.join(", ")}. Hours: ${site.hours}.`,
  );
  lines.push("");

  lines.push("## How it works");
  lines.push("1. Get a quote — tell us about your space. Free estimate, no commitment.");
  lines.push("2. Pick a time — same-day or scheduled. You choose what fits.");
  lines.push("3. We clean — insured, bonded crew. Eco-friendly supplies included.");
  lines.push("4. You approve — not perfect? We're back within 24 hours, free.");
  lines.push("");

  lines.push("# Services");
  lines.push("");
  for (const s of services) {
    lines.push(`## ${s.name}`);
    lines.push(`URL: ${absoluteUrl(`/services/${s.slug}`)}`);
    lines.push("");
    lines.push(s.lead);
    lines.push("");
    lines.push("What's included:");
    for (const item of s.included) lines.push(`- ${item}`);
    lines.push("");
    lines.push("Ideal for:");
    for (const item of s.idealFor) lines.push(`- ${item}`);
    lines.push("");
    lines.push("FAQ:");
    for (const f of s.faqs) {
      lines.push(`Q: ${f.question}`);
      lines.push(`A: ${f.answer}`);
    }
    lines.push("");
  }

  lines.push("# Service Areas");
  lines.push("");
  for (const l of locations) {
    lines.push(`## ${l.name}`);
    lines.push(`URL: ${absoluteUrl(`/cleaning/${l.slug}`)}`);
    lines.push("");
    lines.push(l.lead);
    lines.push("");
    lines.push("How we help:");
    for (const item of l.highlights) lines.push(`- ${item}`);
    lines.push("");
    lines.push("FAQ:");
    for (const f of l.faqs) {
      lines.push(`Q: ${f.question}`);
      lines.push(`A: ${f.answer}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
