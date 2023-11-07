import { MetadataRoute } from 'next'
import type { Robots } from '@/types'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/__private/',
    },
    sitemap: 'https://www.stoneydsp.com/sitemap.xml',
  }
}
