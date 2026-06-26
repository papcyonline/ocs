import { site, absoluteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { locations } from "@/lib/locations";

// Serves /llms.txt — a curated, LLM-friendly map of the site (Answer.AI's
// proposed standard). Generated from the same data as the pages so it never
// drifts out of sync.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(
    `${site.name} (${site.shortName}) is a locally owned, insured, bonded, and DBE-certified cleaning company serving ${site.serviceArea}. Hours: ${site.hours}. Phone: ${site.phone}.`,
  );
  lines.push("");

  lines.push("## Services");
  for (const s of services) {
    lines.push(
      `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.metaDescription}`,
    );
  }
  lines.push("");

  lines.push("## Service Areas");
  for (const l of locations) {
    lines.push(
      `- [${l.name}](${absoluteUrl(`/cleaning/${l.slug}`)}): ${l.metaDescription}`,
    );
  }
  lines.push("");

  lines.push("## Key Pages");
  lines.push(
    `- [Get a Free Quote](${absoluteUrl("/quote")}): Request a free, no-commitment cleaning estimate.`,
  );
  lines.push(
    `- [FAQ](${absoluteUrl("/faq")}): Answers on booking, supplies, pets, pricing, and the satisfaction guarantee.`,
  );
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Phone: ${site.phone}`);
  lines.push(`- Email: ${site.emails.join(", ")}`);
  lines.push(`- Hours: ${site.hours}`);
  lines.push(`- Service area: ${site.serviceArea}`);
  lines.push("");

  lines.push("## Optional");
  lines.push(
    `- [Full content](${absoluteUrl("/llms-full.txt")}): Expanded details for every service and service area.`,
  );
  lines.push(`- [Sitemap](${absoluteUrl("/sitemap.xml")})`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
