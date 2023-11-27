// import { MetadataRoute } from 'next'

import { type Manifest } from '@/types/manifest'

import AndroidChrome512x512 from '@/public/images/favicon/android-chrome-512x512.png'
import AndroidChrome192x192 from '@/public/images/favicon/android-chrome-192x192.png'

import AndroidIcon36x36 from '@/public/images/favicon/android-icon-36x36.png'
import AndroidIcon48x48 from '@/public/images/favicon/android-icon-48x48.png'
import AndroidIcon72x72 from '@/public/images/favicon/android-icon-72x72.png'
import AndroidIcon96x96 from '@/public/images/favicon/android-icon-96x96.png'
import AndroidIcon144x144 from '@/public/images/favicon/android-icon-144x144.png'

import Favicon32x32 from '@/public/images/favicon/favicon__32x32.ico'
import Favicon48x48 from '@/public/images/favicon/favicon__48x48.ico'
import Favicon64x64 from '@/public/images/favicon/favicon__64x64.ico'
import Favicon96x96 from '@/public/images/favicon/favicon__96x96.ico'

import Favicon144x144 from '@/public/images/favicon/favicon__144x144.ico'
import Favicon168x168 from '@/public/images/favicon/favicon__168x168.ico'
import Favicon256x256 from '@/public/images/favicon/favicon__256x256.ico'

import WIcon196x128 from '@/public/images/w_icon__196x128.png'
import WIcon384x256 from '@/public/images/w_icon__384x256.png'
import WIcon768x512 from '@/public/images/w_icon__768x512.png'
import WIcon1024x768 from '@/public/images/w_icon__1024x768.png'

export default async function webmanifest(): Promise<Manifest> {

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
    screenshots: [
      {
        src: AndroidChrome512x512.src,
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'narrow'
      },
      {
        src: WIcon1024x768.src,
        sizes: '1024x768',
        type: 'image/png',
        form_factor: 'wide'
      },
    ],

    icons: [
      {
        src: AndroidIcon36x36.src,
        sizes: "36x36",
        type: "image/png"
      },
      {
        src: AndroidIcon48x48.src,
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: AndroidIcon72x72.src,
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: AndroidIcon96x96.src,
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: AndroidIcon144x144.src,
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: AndroidChrome192x192.src,
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: AndroidChrome512x512.src,
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: Favicon32x32.src,
        sizes: '32x32',
        type: 'image/x-icon'
      },
      {
        src: Favicon48x48.src,
        sizes: '48x48',
        type: 'image/x-icon'
      },
      {
        src: Favicon64x64.src,
        sizes: '64x64',
        type: 'image/x-icon'
      },
      {
        src: Favicon96x96.src,
        sizes: '96x96',
        type: 'image/x-icon'
      },
      {
        src: Favicon144x144.src,
        sizes: '144x144',
        type: 'image/x-icon'
      },
      {
        src: Favicon168x168.src,
        sizes: '168x168',
        type: 'image/x-icon'
      },
      {
        src: Favicon256x256.src,
        sizes: '256x256',
        type: 'image/x-icon'
      },
      // {
      //   src: `/images/favicon/favicon-32x32.png`,
      //   sizes: '32x32',
      //   type: 'image/png'
      // },
      // {
      //   src: `/images/favicon/favicon-64x64.png`,
      //   sizes: '64x64',
      //   type: 'image/png'
      // },
      // {
      //   src: `/images/favicon/favicon-168x168.png`,
      //   sizes: '168x168',
      //   type: 'image/png'
      // },
      // {
      //   src: `/images/favicon/favicon-256x256.png`,
      //   sizes: '256x256',
      //   type: 'image/png'
      // },
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
        src: WIcon196x128.src,
        sizes: '196x128',
        type: 'image/png'
      },
      {
        src: WIcon384x256.src,
        sizes: '384x256',
        type: 'image/png'
      },
      {
        src: WIcon768x512.src,
        sizes: '768x512',
        type: 'image/png'
      },
      {
        src: WIcon1024x768.src,
        sizes: '1024x768',
        type: 'image/png'
      },
    ],
  }
}
