import Contact from './contact'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
}

export default async function ContactPage() {
  return (
    <Contact />
  )
}
