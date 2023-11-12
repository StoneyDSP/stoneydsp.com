import FetchContent from '@/app/projects/fetch/fetch_content'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Fetch',
  description: 'Asyncronous Fetch API tests.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/fetch'
  }
}

export default async function FetchPage() {
  return (
    <FetchContent />
  )
}
