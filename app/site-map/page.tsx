import SiteMap from './sitemap'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sitemap',
}

export default async function SiteMapPage() {
  return (
    <SiteMap />
  )
}
