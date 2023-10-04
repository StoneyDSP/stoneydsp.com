import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as Headers from '../_shared/headers';
import * as Methods from '../_shared/methods';
import * as UserAgents from '../_shared/useragents';

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
        ...Headers.headers,
        'Content-Type': 'application/json; charset=utf-8'
      },
    });
  };

  if (request.method === 'POST') {
    // Reject POST requests
    return response.status(401).json({
      status: 401,
      message: 'forbidden',
      headers: {
        ...Headers.headers,
        'Content-Type': 'application/json; charset=utf-8' },

    });
  } else if (request.method === 'OPTIONS') {
    // This is needed if you're planning to invoke your function from a browser.
    return response.status(200).json({
      status: 200,
      message: 'ok',
      headers: {
        ...Headers.headers,
        'Content-Type': 'application/json; charset=utf-8'
      },
    });
  }

  return response.status(200).json({
    status: 200,
    query: request.query,
    headers: {
      ...Headers.headers,
      'Content-Type': 'application/json; charset=utf-8'
    },
  });
};
