import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "OCS — Ottri Cleaning Services | Louisville, KY",
  description:
    "Residential, commercial, and post-construction cleaning across greater Louisville. Insured, bonded, DBE certified.",
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
        {children}
      </body>
    </html>
  );
}
