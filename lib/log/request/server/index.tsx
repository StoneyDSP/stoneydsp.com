'use server'
import 'server-only'
import { userAgent, type NextRequest } from 'next/server'

const statusSymbolText = [
  { status: 200, symbol: `\u{2713}`, text: "ok" }
]

const logRequestToServer = (req: NextRequest) => {
  'use server'
  const { isBot } = userAgent(req)
  const visitor = isBot ? 'Bot' : 'Human'
  const travelling = isBot ? 'crawling' : 'visiting'
  const country = (req.geo && req.geo.country) || 'Earth'
  const city = (req.geo && req.geo.city) || 'Nowhere'
  const region = (req.geo && req.geo.region) || 'Somewhere'
  const ip = (req.ip) || 'Visitor'
  const agent = (req.headers.get('user-agent')) || 'Agent Unknown'

  if (process.env.VERCEL_ENV === 'development') {
    console.log(` \u{2713} ${req.method} ${req.nextUrl.pathname}`)
  } else {
    console.log(` \u{2713} ${visitor} ${ip} ${travelling} from ${city}, ${region}, ${country} with ${agent}.`)
  }
}

export default logRequestToServer
