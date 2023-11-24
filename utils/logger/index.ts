import { userAgent, type NextRequest } from 'next/server'

export default function logMiddlewareRequest(request: NextRequest): void {
  // Extract visitor info.
  const { isBot } = userAgent(request)
  // Determine details to be logged.
  const visitor = isBot ? 'Bot' : 'User'
  const travelling = isBot ? 'crawling' : 'visiting'
  const country = (request.geo && request.geo.country) || 'Earth'
  const city = (request.geo && request.geo.city) || 'Nowhere'
  const region = (request.geo && request.geo.region) || 'Somewhere'
  const ip = (request.ip) || 'Visitor'
  const agent = (request.headers.get('user-agent')) || 'Agent Unknown'

  console.log(`${visitor} ${ip} ${travelling} from ${city}, ${region}, ${country} with ${agent}`)
}
