import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Names of AI answer-engine and training crawlers. Explicitly allowed so the
// site is eligible to be cited in AI answers (the goal of AEO). To opt out of
// AI use while keeping normal search, change `allow` to `disallow` below.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
