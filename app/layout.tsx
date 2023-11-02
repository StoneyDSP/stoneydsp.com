import { Header, Footer, Main } from '@/components/elements'
import { Analytics } from '@vercel/analytics/react'
// import Favicon from '@/app/favicon.ico'
import { Metadata } from 'next'
import { Suspense } from 'react'
// import { GoogleTagManager } from '@next/third-parties/google'
import './globals.css'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-foreground bg-background">
        <Suspense>
          <Header title={'Home'} />
          <Main>
            {children}
          </Main>
          <Footer />
        </Suspense>
        {/* <GoogleTagManager gtmId="GTM-WCM3NS5C" /> */}
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata  = {
  title: {
    default: 'StoneyDSP',
    template: '%s | StoneyDSP',
  },
  applicationName: 'StoneyDSP',
  description: 'Systems, Web, Audio & Graphics',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Nathan', url: 'https://github.com/nathanjhood' }],
  metadataBase: new URL('https://www.stoneydsp.com'),
  // manifest: "https://www.stoneydsp.com/manifest.webmanifest",
  verification: {
    google: "U222mQRVBnX_8XrWZU9c6ETanVW8lFK6jvhJFQwtcdE",
  },
  other: {
    "google-site-verification": "RGeh6hqM-ZZ-p0iM4G9NekMKA5RJmK-3qsmVmghRA6o"
  },
  // icons: [{ rel: 'icon', url: Favicon.src }],
  // icons: [
  //   {
  //     rel: "icon",
  //     url: "https://example.com/icon.png"
  //   },
  //   {
  //     rel: "apple-touch-icon",
  //     url: "https://example.com/apple-icon.png"
  //   }
  // ],
  alternates: {
    canonical: '/',
    // languages: {
      // 'en-GB': '/en-GB',
      // 'en-US': '/en-US',
      // 'es-ES': '/es-ES',
      // 'de-DE': '/de-DE',
      // 'fr-FR': '/fr-FR',
    // },
  },
  openGraph: {
    title: 'StoneyDSP.com',
    description: 'Systems, Web, Audio & Graphics',
    url: 'https://www.stoneydsp.com',
    siteName: 'StoneyDSP.com',
    images: [
      {
        url: '/images/w_icon__196x128.png',
        width: 196,
        height: 128,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/w_icon__384x256.png',
        width: 384,
        height: 256,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/w_icon__768x512.png',
        width: 768,
        height: 512,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/w_icon__1024x768.png',
        width: 1024,
        height: 768,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/favicon/android-icon-36x36.png',
        width: '36',
        height: '36',
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/favicon/android-icon-48x48.png',
        width: '48',
        height:'48',
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/favicon/android-icon-72x72.png',
        width: '72',
        height: '72',
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/favicon/android-icon-96x96.png',
        width: '96',
        height: '96',
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/favicon/android-icon-144x144.png',
        width: '144',
        height: '144',
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/favicon/android-chrome-192x192.png',
        width: '192',
        height: '192',
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: '/images/favicon/android-chrome-512x512',
        width: '512',
        height: '512',
        type: 'image/png',
        alt: 'Systems, Web, Audio & Graphics',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StoneyDSP.com',
    description: 'Systems, Web, Audio & Graphics',
    siteId: '1467726470533754880',
    site: 'https://www.stoneydsp.com',
    images: [
      {
        url: 'https://www.stoneydsp.com/images/w_icon__196x128.png',
        width: 196,
        height: 128,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: 'https://www.stoneydsp.com/images/w_icon__384x256.png',
        width: 384,
        height: 256,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: 'https://www.stoneydsp.com/images/w_icon__768x512.png',
        width: 768,
        height: 512,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: 'https://www.stoneydsp.com/images/w_icon__1024x768.png',
        width: 1024,
        height: 768,
        alt: 'Systems, Web, Audio & Graphics',
      },
    ],
  },
  // robots: {
  //   index: false,
  //   follow: true,
  //   nocache: true,
  //   googleBot: {
  //     index: true,
  //     follow: false,
  //     noimageindex: true,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }
    // { media: '(prefers-color-scheme: light)', color: 'cyan' },
    // { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
