import { ImageResponse } from "next/og";

// Apple touch icon (home-screen bookmark on iOS). Brand-orange tile with the
// "O" monogram, matching the generated favicon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff6b00",
          color: "#ffffff",
          fontSize: "120px",
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        O
      </div>
    ),
    { ...size },
  );
}
