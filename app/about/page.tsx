import About from './about'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About',
}

export default async function AboutPage() {
  return (
    <About />
  )
}
