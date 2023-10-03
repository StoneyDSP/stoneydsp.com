export const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "X-UA-Compatible": "ie-edge",
  "Content-Type": "application/json",
  "Cache-Control": "max-age=10, s-maxage=86400, immutable",
  "CDN-Cache-Control": "max-age=60",
  "Vercel-CDN-Cache-Control": "max-age=3600",
  "X-DNS-Prefetch-Control": "on",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy": "script-src 'self'; connect-src 'vitals.vercel-insights.com'; default-src 'self' https://www.stoneydsp.com https://*.stoneydsp.com"
};
