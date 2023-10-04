import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as cors from '../_shared/headers';

export default async function handler(request: VercelRequest, response: VercelResponse)
{
  // This is needed if you're planning to invoke your function from a browser.
  if (request.method === 'OPTIONS') {
    return response.status(418).json({
      message: 'teapot',
      headers: { ...cors.headers, 'Content-Type': 'application/json' },
      status: 418,
    });
  }

  try {
    request.body;
  } catch (error) {
    return response.status(400).json({
      error: error.message,
      headers: { ...cors.headers, 'Content-Type': 'application/json' },
      status: 400,
    });
  };

  return console.log(response.status(418).json({
    message: 'teapot',
    headers: { ...cors.headers, 'Content-Type': 'application/json' },
    status: 418,
  }));
};
