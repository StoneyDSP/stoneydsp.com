import { MetadataRoute } from 'next'

export default function webmanifest(): MetadataRoute.Manifest {
  return {
    name: "StoneyDSP",
    short_name: "StoneyDSP",
    icons: [
      {
        src: "https://www.stoneydsp.com/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "https://www.stoneydsp.com/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
  }
}
