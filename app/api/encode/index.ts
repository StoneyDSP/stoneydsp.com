import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Base64 } from 'js-base64';
import * as Headers from '../_shared/headers';
import * as Methods from '../_shared/methods';


export default async function handler(request: VercelRequest, response: VercelResponse)
{

  response.setHeader('Content-Type', 'application/json');

  // This is needed if you're planning to invoke your function from a browser.
  if (request.method === 'OPTIONS') {
    return response.status(200).json({
      message: 'ok',
      headers: { ...Headers.headers, 'Content-Type': 'application/json; charset=utf-8' },
      status: 200,
    });
  }

  try {
    request.body;
  } catch (error) {
    return response.status(400).json({
      error: error.message,
      headers: { ...Headers.headers, 'Content-Type': 'application/json; charset=utf-8' },
      status: 400,
    });
  };

  response.status(200).json({
    message: Base64.encode(JSON.stringify(request.query), true),
  });

  return response;
};
