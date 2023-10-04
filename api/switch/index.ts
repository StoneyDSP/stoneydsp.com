import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as Headers from '../_shared/headers';
import * as Methods from '../_shared/methods';
import * as UserAgents from '../_shared/useragents';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {

  // We will use this to filter out suspicious requests, such as
  // 'HEAD' on the preview branch/environment...
  const env = process.env.NODE_ENV;

  const ua = UserAgents.userAgent(request.headers.toString['user-agent']);

  switch (request.method) {

  // case 'GET':
  // //block of code
  // break;

  // case 'HEAD':
  // //block of code
  // break;

  case 'OPTIONS':
  if (ua.isBot) {
    // Reject botty requests
    response.status(416).json({
      status: 416,
      message: 'teapot',
      headers: {
        ...Headers.headers,
        'Content-Type': 'application/json; charset=utf-8' },
    });

  } else {
    // This is needed if you're planning to invoke your function from a browser.
    response.status(200).json({
      status: 200,
      message: 'ok',
      headers: {
        ...Headers.headers,
        'Content-Type': 'application/json; charset=utf-8'
      },
    });
  };
  break;

  case 'POST':
  // Reject POST requests
  response.status(401).json({
    status: 401,
    message: 'forbidden',
    headers: {
      ...Headers.headers,
      'Content-Type': 'application/json; charset=utf-8' },
  });
  break;

  // case 'PUT':
  // //block of code
  // break;

  // case 'DELETE':
  // //block of code
  // break;

  // case 'PATCH':
  // //block of code
  // break;

  default:
  //block of code
  response.status(200).json({
    status: 200,
    message: 'default response',
    headers: {
      ...Headers.headers,
      'Content-Type': 'application/json; charset=utf-8'
    },
  });
  };

  return response;
}
