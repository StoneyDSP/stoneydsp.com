import Footer from '@/components/elements/footer/footer'
import Header from '@/components/elements/header/header'
import SpinnerRoot from '@/app/spinner'
import { AuthWrapper } from '@/components/elements/banner/consent'
// import { GoogleTagManager } from '@next/third-parties/google'
import { meta } from './meta'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter } from 'next/font/google'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'
import './globals.css'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = meta

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode | Promise<React.ReactNode>
}) {

  const nonce = headers().get('x-nonce')
  const middlewareResponse = headers().get('X-StoneyDSP-Middleware-Response')

  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  try {

    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.log(` \u{2715} RootLayout() - :: Error returning new Root Layout object: ${error.message}`)
      throw error
    }

    return (
      <html lang="en">
        <body className={inter.className}>
          <Suspense fallback={<SpinnerRoot />}>
            <Header />
              {children}
              <AuthWrapper />
            <Footer />
            <p className='text-right'>Last Middleware response: {middlewareResponse ?? 'ERROR'}</p>
          </Suspense>
          <p className='text-right'>First Middleware response: {middlewareResponse ?? 'ERROR'}</p>
        </body>
        {/* <GoogleTagManager gtmId="GTM-WCM3NS5C" /> */}
      </html>
    )

  } catch(e) {

    const error: any = e
    console.log(` \u{2715} RootLayout() - :: Error returning new Root Layout object: ${error}`)
    throw new Error(error)
  }
}
