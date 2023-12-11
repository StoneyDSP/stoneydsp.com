import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

const publicSiteUrl = getPublicSiteURL()

export const meta: Metadata  = {
  title: {
    default: 'StoneyDSP',
    template: '%s | StoneyDSP',
  },
  applicationName: 'StoneyDSP',
  description: 'Systems, Web, Audio & Graphics',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Nathan', url: 'https://github.com/nathanjhood' }],
  metadataBase: new URL('/', publicSiteUrl),
  manifest: new URL('manifest.webmanifest', publicSiteUrl),
  verification: {
    google: "U222mQRVBnX_8XrWZU9c6ETanVW8lFK6jvhJFQwtcdE",
  },
  openGraph: {
    title: 'StoneyDSP',
    description: 'Systems, Web, Audio & Graphics',
    siteName: 'stoneydsp.com',
    url: new URL(publicSiteUrl),
    images: [
      {
        url: new URL('images/w_icon__196x128.png', publicSiteUrl),
        width: 196,
        height: 128,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/w_icon__384x256.png', publicSiteUrl),
        width: 384,
        height: 256,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/w_icon__768x512.png', publicSiteUrl),
        width: 768,
        height: 512,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/w_icon__1024x768.png', publicSiteUrl),
        width: 1024,
        height: 768,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/favicon/android-icon-36x36.png', publicSiteUrl),
        width: 36,
        height: 36,
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/favicon/android-icon-48x48.png', publicSiteUrl),
        width: 48,
        height:48,
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/favicon/android-icon-72x72.png', publicSiteUrl),
        width: 72,
        height: 72,
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/favicon/android-icon-96x96.png', publicSiteUrl),
        width: 96,
        height: 96,
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/favicon/android-icon-144x144.png', publicSiteUrl),
        width: 144,
        height: 144,
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/favicon/android-chrome-192x192.png', publicSiteUrl),
        width: 192,
        height: 192,
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/favicon/android-chrome-512x512.png', publicSiteUrl),
        width: 512,
        height: 512,
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StoneyDSP',
    description: 'Systems, Web, Audio & Graphics',
    siteId: '1467726470533754880',
    site: publicSiteUrl,
    images: [
      {
        url: new URL('images/w_icon__196x128.png', publicSiteUrl),
        width: 196,
        height: 128,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/w_icon__384x256.png', publicSiteUrl),
        width: 384,
        height: 256,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/w_icon__768x512.png', publicSiteUrl),
        width: 768,
        height: 512,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: new URL('images/w_icon__1024x768.png', publicSiteUrl),
        width: 1024,
        height: 768,
        alt: 'Systems, Web, Audio & Graphics',
      },
    ],
  },
  // other: {
  //   "google-site-verification": "RGeh6hqM-ZZ-p0iM4G9NekMKA5RJmK-3qsmVmghRA6o"
  // },
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "#00ffff" },
  //   { media: "(prefers-color-scheme: dark)", color: "#800080" }
  //   { media: '(prefers-color-scheme: light)', color: 'cyan' },
  //   { media: '(prefers-color-scheme: dark)', color: 'black' },
  // ],
}
