import { Analytics } from '@vercel/analytics/react'
// import { getGoogleAnalyticsID } from '@/utils/helpers'
import Script from 'next/script'
import SupabaseProvider from '@/app/supabase-provider'
import { Metadata } from 'next'
import '@/assets/main.css'
import '@/app/globals.css'

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
  alternates: {
    canonical: '/',
    languages: {
      'en-GB': '/en-GB',
      // 'en-US': '/en-US',
      // 'es-ES': '/es-ES',
      // 'de-DE': '/de-DE',
      // 'fr-FR': '/fr-FR',
    },
  },
  openGraph: {
    title: 'StoneyDSP.com',
    description: 'Systems, Web, Audio & Graphics',
    url: 'https://www.stoneydsp.com',
    siteName: 'StoneyDSP.com',
    images: [
      {
        url: 'https://www.stoneydsp.com/w_icon__196x128.png',
        width: 196,
        height: 128,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: 'https://www.stoneydsp.com/w_icon__384x256.png',
        width: 384,
        height: 256,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: 'https://www.stoneydsp.com/w_icon__768x512.png',
        width: 768,
        height: 512,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: 'https://www.stoneydsp.com/w_icon__1024x768.png',
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
        url: 'https://www.stoneydsp.com/w_icon__196x128.png',
        width: 196,
        height: 128,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: 'https://www.stoneydsp.com/w_icon__384x256.png',
        width: 384,
        height: 256,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: 'https://www.stoneydsp.com/w_icon__768x512.png',
        width: 768,
        height: 512,
        alt: 'Systems, Web, Audio & Graphics',
      },
      {
        url: 'https://www.stoneydsp.com/w_icon__1024x768.png',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const googleAnalyticsID = getGoogleAnalyticsID()

  return (
    <html lang="en">
      <body>
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WCM3NS5C"
            height="0"
            width="0"
            className="invisible hidden"
          >
          </iframe>
        </noscript> */}
        {/* <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsID}`} />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${googleAnalyticsID}');
          `}
        </Script> */}
        <SupabaseProvider>
          <main
            className="min-h-screen bg-background flex flex-col items-center"
          >
            {children}
            <Analytics />
          </main>
        </SupabaseProvider>
      </body>
    </html>
  )
}
