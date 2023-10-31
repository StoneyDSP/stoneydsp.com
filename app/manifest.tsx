import { MetadataRoute } from 'next'

export default function webmanifest(): MetadataRoute.Manifest {
  return {
    name: "StoneyDSP",
    short_name: "StoneyDSP",
    description: 'Systems, Web, Audio & Graphics',
    start_url: '/',
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
    icons: [
      {
        src: "https://www.stoneydsp.com/favicon/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
        // density: "0.75"
      },
      {
        src: "https://www.stoneydsp.com/favicon/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
        // density: "1.0"
      },
      {
        src: "https://www.stoneydsp.com/favicon/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        // density: "1.5"
      },
      {
        src: "https://www.stoneydsp.com/favicon/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        // density: "2.0"
      },
      {
        src: "https://www.stoneydsp.com/favicon/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        // density: "3.0"
      },
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
  }
}
