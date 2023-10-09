import type { VercelRequest, VercelResponse, VercelApiHandler } from '@vercel/node';
import * as Headers from '../headers';
import * as Methods from '../methods';
// import * as UserAgents from '../useragents';

export async function getHandler(
  request: VercelRequest,
  response: VercelResponse
)
{
  try {
    request.body;
  } catch (error) {
    // Error out now if the request is a mangled one...
    return console.log(response.status(400).json(
      {
        status: 400,
        error: error.message,
        headers: {
          'Content-Type': 'application/json',
          ...Headers.headers,
        },
      }
    ));
  };

  console.log("Called the 'GET' handler. \n");

  console.log(process.env.VERCEL_ENV);

  return response;
};