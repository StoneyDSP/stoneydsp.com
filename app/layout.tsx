import { meta } from './meta'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { cookies, headers } from 'next/headers'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = meta

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )

}
