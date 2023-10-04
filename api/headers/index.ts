import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as Headers from '../_shared/headers';
import * as Methods from '../_shared/methods';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {

  try {
    request.body;
  } catch (error) {
    return response.status(400).json({
      status: 400,
      error: error.message,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...Headers.headers,
      },
    });
  };

  if (request.method === Methods.HTTP_METHODS[2] /* 'OPTIONS' */) {
    // This is needed if you're planning to invoke your function from a browser.
    return response.status(200).json({
      status: 200,
      message: 'ok',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...Headers.headers,
      },
    });
  }

  return response.status(200).json({
    status: 200,
    query: request.query,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
      ...Headers.headers,
    },
  });
};
