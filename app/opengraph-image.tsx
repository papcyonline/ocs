import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "Ottri Cleaning Services — residential, commercial & post-construction cleaning in Louisville, KY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamically generated social-share card. Used for Open Graph + Twitter and
// referenced as the business image in structured data.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#ff6b00",
            }}
          />
          <div
            style={{
              color: "#ffffff",
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Ottri Cleaning Services
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            Cleanliness is our commitment to your well-being.
          </div>
          <div style={{ color: "#ff8a33", fontSize: "34px", fontWeight: 600 }}>
            Homes. Offices. Post-build.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#a3a3a3",
            fontSize: "26px",
            letterSpacing: "0.04em",
          }}
        >
          <span style={{ color: "#ffffff" }}>{site.serviceArea}</span>
          <span>·</span>
          <span>Insured · Bonded · DBE Certified</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
