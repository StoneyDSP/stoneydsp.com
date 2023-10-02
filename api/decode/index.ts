import { Base64 } from 'js-base64';

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(request: VercelRequest, response: VercelResponse): void | VercelResponse
{
  response.setHeader("X-UA-Compatible", "ie-edge");
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Vercel-CDN-Cache-Control", "max-age=3600");
  response.setHeader("CDN-Cache-Control", "max-age=60");
  response.setHeader("Cache-Control", "max-age=10, s-maxage=86400, immutable");
  response.setHeader("X-DNS-Prefetch-Control", "on");
  response.setHeader("X-XSS-Protection", "1; mode=block");
  response.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.setHeader("Content-Security-Policy", "script-src 'self'; connect-src 'vitals.vercel-insights.com'; default-src 'self' https://www.stoneydsp.com https://*.stoneydsp.com");

  try {
    request.body;
  } catch (error) {
    return response.status(400).json({ error: '400' });
  }

  // console.log(Base64.decode(JSON.stringify(request.query)));

  return response.status(200).json({
    query: Base64.decode(JSON.stringify(request.query))
  });
}
