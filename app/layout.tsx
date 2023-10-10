import { Analytics } from '@vercel/analytics/react'
import Footer from './footer'
import './globals.css'

export const metadata = {
  title: 'StoneyDSP',
  description: 'Systems, Web, Audio & Graphics',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  )
}
