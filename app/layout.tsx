import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const mosvita = localFont({
  src: [
    { path: "./fonts/Mosvita-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Mosvita-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Mosvita-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./fonts/Mosvita-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Mosvita-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "./fonts/Mosvita-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-mosvita",
  display: "swap",
});

const mosvitaExpanded = localFont({
  src: [
    { path: "./fonts/Mosvita-LightExpanded.otf", weight: "300", style: "normal" },
    { path: "./fonts/Mosvita-Expanded.otf", weight: "400", style: "normal" },
    { path: "./fonts/Mosvita-SemiBoldExpanded.otf", weight: "600", style: "normal" },
    { path: "./fonts/Mosvita-BoldExpanded.otf", weight: "700", style: "normal" },
    { path: "./fonts/Mosvita-ExtraBoldExpanded.otf", weight: "800", style: "normal" },
    { path: "./fonts/Mosvita-BlackExpanded.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-mosvita-expanded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "OCS — Ottri Cleaning Services | Louisville, KY",
    template: "%s | OCS — Ottri Cleaning Services",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "cleaning services Louisville KY",
    "house cleaning Louisville",
    "commercial cleaning Louisville",
    "post-construction cleaning",
    "maid service Louisville",
    "office cleaning Kentucky",
    "move-out cleaning Louisville",
    "DBE certified cleaning",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: "OCS — Ottri Cleaning Services | Louisville, KY",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "OCS — Ottri Cleaning Services | Louisville, KY",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Search-engine ownership verification. Tokens are read from the environment
  // so they can differ per deployment; tags are omitted entirely when unset.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
  category: "Cleaning Services",
};

export const viewport: Viewport = {
  themeColor: "#ff6b00",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mosvita.variable} ${mosvitaExpanded.variable} font-sans bg-white text-neutral-900 antialiased`}
      >
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
