'use server'
import 'server-only'
import { userAgent, NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {

  const { isBot } = userAgent(request)
  const visitor = isBot ? 'Bot' : 'Human'
  const travelling = isBot ? 'crawling' : 'visiting'
  const country = (request?.geo && request.geo.country) || 'Earth'
  const city = (request?.geo && request.geo.city) || 'Nowhere'
  const region = (request?.geo && request.geo.region) || 'Somewhere'
  const ip = (request?.ip) || 'Visitor'
  const agent = (request?.headers.get('user-agent')) || 'Agent Unknown'

  const date = new Date()

  try {

    console.log(`OK: ${visitor} ${ip} ${travelling} from ${city}, ${region}, ${country} with ${agent}.`)

    return new NextResponse('Cache Control example', {
      status: 200,
      headers: {
        'Cache-Control': 'max-age=10',
        'CDN-Cache-Control': 'max-age=60',
        'Vercel-CDN-Cache-Control': 'max-age=3600',
        'X-StoneyDSP-API-Headers-Cache-Control': `${date.toUTCString()}`
      },
    })

  } catch(e) {

    const error: any = e
    console.log(`ERROR: ${visitor} ${ip} ${travelling} from ${city}, ${region}, ${country} with ${agent}.`)

    throw new Error(error)
  }
}
