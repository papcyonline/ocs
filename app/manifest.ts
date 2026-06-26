import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff6b00",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}
