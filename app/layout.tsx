import { Header, Footer, Main } from '@/components/elements'
import { Analytics } from '@vercel/analytics/react'
// import SupabaseProvider from '@/utils/supabase-provider'
import { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
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
      <body>
        {/* <SupabaseProvider> */}
        <Header title={'Home'} />
        <Main>
          {children}
        </Main>
        <Footer />
        <GoogleTagManager gtmId="GTM-WCM3NS5C" />
        <Analytics />
        {/* </SupabaseProvider> */}
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
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StoneyDSP.com',
    description: 'Systems, Web, Audio & Graphics',
    siteId: '1467726470533754880',
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
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
