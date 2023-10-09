import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as Headers from '../_shared/headers';
import * as Methods from '../_shared/methods';

export default async function handler(request: VercelRequest, response: VercelResponse)
{

  response.setHeader('Content-Type', 'application/json');

  // This is needed if you're planning to invoke your function from a browser.
  if (request.method === 'OPTIONS') {
    console.log(response.status(418).json({
      message: 'teapot',
      headers: { ...Headers.headers, 'Content-Type': 'application/json' },
      status: 418,
    }));
    return response;
  }

  try {
    request.body;
  } catch (error) {
    return response.status(400).json({
      error: error.message,
      headers: { ...Headers.headers, 'Content-Type': 'application/json' },
      status: 400,
    });
  };

  console.log(response.status(418).json({
    message: 'teapot',
    headers: { ...Headers.headers, 'Content-Type': 'application/json' },
    status: 418,
  }));

  return response;
};
