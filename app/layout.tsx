// import { AuthWrapper } from '@/components/elements/banner/consent'
import { meta } from './meta'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = meta

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode | Promise<React.ReactNode>
}) {

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

  const nonce = headers().get('x-nonce')
  const middlewareResponse = headers().get('X-StoneyDSP-Middleware-Response')

  const { data, error } = await supabase.auth.getSession()

  if (!error) {

    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    )
  }

  console.error(` \u{2715} :: ${error.message}`)
  throw error
}
