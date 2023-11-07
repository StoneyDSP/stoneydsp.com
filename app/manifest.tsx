import { MetadataRoute } from 'next'

export default function webmanifest(): MetadataRoute.Manifest {

  // const defaultUrl = process.env.VERCEL_URL
  // ? `https://${process.env.VERCEL_URL}`
  // : 'http://localhost:3000'

  return {
    name: "StoneyDSP",
    short_name: "StoneyDSP",
    description: 'Systems, Web, Audio & Graphics',
    start_url: '/',
    id: '/',
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
    icons: [
      {
        src: '/images/favicon/android-icon-36x36.png',
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: `/images/favicon/android-icon-48x48.png`,
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: `/images/favicon/android-icon-72x72.png`,
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: `/images/favicon/android-icon-96x96.png`,
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: `/images/favicon/android-icon-144x144.png`,
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: `/images/favicon/android-chrome-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `/images/favicon/android-chrome-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: `/images/favicon/favicon__32x32.ico`,
        sizes: '32x32',
        type: 'image/x-icon'
      },
      {
        src: `/images/favicon/favicon__48x48.ico`,
        sizes: '48x48',
        type: 'image/x-icon'
      },
      {
        src: `/images/favicon/favicon__64x64.ico`,
        sizes: '64x64',
        type: 'image/x-icon'
      },
      {
        src: `/images/favicon/favicon__96x96.ico`,
        sizes: '96x96',
        type: 'image/x-icon'
      },
      {
        src: `/images/favicon/favicon__144x144.ico`,
        sizes: '144x144',
        type: 'image/x-icon'
      },
      {
        src: `/images/favicon/favicon__168x168.ico`,
        sizes: '168x168',
        type: 'image/x-icon'
      },
      {
        src: `/images/favicon/favicon__256x256.ico`,
        sizes: '256x256',
        type: 'image/x-icon'
      },
      {
        src: `/images/favicon/favicon-32x32.png`,
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: `/images/favicon/favicon-64x64.png`,
        sizes: '64x64',
        type: 'image/png'
      },
      {
        src: `/images/favicon/favicon-168x168.png`,
        sizes: '168x168',
        type: 'image/png'
      },
      {
        src: `/images/favicon/favicon-256x256.png`,
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: `/images/favicon/ms-icon-70x70.png`,
        sizes: '70x70',
        type: 'image/png'
      },
      {
        src: `/images/favicon/ms-icon-150x150.png`,
        sizes: '150x150',
        type: 'image/png'
      },
      {
        src: `/images/favicon/ms-icon-310x310.png`,
        sizes: '310x310',
        type: 'image/png'
      },
      {
        src: `/images/w_icon__196x128.png`,
        sizes: '196x128',
        type: 'image/png'
      },
      {
        src: `/images/w_icon__384x256.png`,
        sizes: '384x256',
        type: 'image/png'
      },
      {
        src: `/images/w_icon__768x512.png`,
        sizes: '768x512',
        type: 'image/png'
      },
      {
        src: `/images/w_icon__1024x768.png`,
        sizes: '1024x768',
        type: 'image/png'
      },
    ],
  }
}
