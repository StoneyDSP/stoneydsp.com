import { MetadataRoute } from 'next'
import type { Robots } from '@/types'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/',
    },
    sitemap: 'https://www.stoneydsp.com/sitemap.xml',
  }
}
