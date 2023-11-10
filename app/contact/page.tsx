import Contact from './contact'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: 'https://www.stoneydsp.com/contact'
  }
}

export default async function ContactPage() {
  return (
    <Contact />
  )
}
