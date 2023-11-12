import AboutContent from '@/app/about/about_content'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: 'https://www.stoneydsp.com/about'
  }
}

export default async function AboutPage() {
  return (
    <AboutContent />
  )
}
