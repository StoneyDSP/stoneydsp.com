import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as cors from './shared/headers';

export default async function handler(request: VercelRequest, response: VercelResponse)
{
  // This is needed if you're planning to invoke your function from a browser.
  if (request.method === 'OPTIONS') {
    return response.status(200).json({ message: 'ok', headers: { ...cors.headers }});
  }

  try {
    request.body;
  } catch (error) {
    return response.status(400).json({
      error: error.message,
      headers: { ...cors.headers },
      status: 400,
    });
  };

  return response.status(200).json({
    headers: { ...cors.headers },
    status: 200,
  });
};
