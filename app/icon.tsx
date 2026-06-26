import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Generated favicon — brand orange tile with the "O" monogram. Replace with a
// raster of the full logo once a square mark is available.
export default function Icon() {
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
          fontSize: "44px",
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
