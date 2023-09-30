import { Base64 } from 'js-base64';

export default async function handler(request, response) {
  response.setHeader('X-UA-Compatible', 'ie-edge' );
  response.setHeader('Content-Type', 'application/json' );
  response.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  response.setHeader('CDN-Cache-Control', 'max-age=60');
  response.setHeader('Cache-Control', 'max-age=10, s-maxage=86400, immutable');
  response.setHeader('X-XSS-Protection', '1; mode=block');

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
