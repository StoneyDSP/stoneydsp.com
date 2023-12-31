import { MetadataRoute } from 'next'
import type { Robots } from '@/types'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: [
        '/_next/__private', 
        '/www/contact', 
        '/contact',
        '/www/account',
        '/account'
      ],
    },
    sitemap: 'https://www.stoneydsp.com/sitemap.xml',
  }
}
