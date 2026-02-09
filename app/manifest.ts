import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Quest Learner Readiness",
    short_name: "Quest",
    description: "Learner readiness dashboard for Nova Pioneer students",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e3a77",
    icons: [
      {
        src: "/AppIcons/android/mipmap-xxxhdpi/ic_launcher.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/AppIcons/Assets.xcassets/AppIcon.appiconset/_/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/AppIcons/Assets.xcassets/AppIcon.appiconset/_/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
