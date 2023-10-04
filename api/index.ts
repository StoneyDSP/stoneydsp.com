import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as Headers from './_shared/headers';
import * as Methods from './_shared/methods';
import * as UserAgents from './_shared/useragents';

const applicationJsonUTF8 = {
  "Content-Type": "application/json; charset=utf-8"
};

export default async function handler(request: VercelRequest, response: VercelResponse)
{
  // We will use this to filter out suspicious requests, such as
  // 'HEAD' on the preview branch/environment...
  const env = process.env.NODE_ENV;

  const ua = UserAgents.userAgent(request.headers.toString['user-agent']);

  try {
    request.body;
  } catch (error) {
    // Error out now if the request is a mangled one...
    return console.log(response.status(400).json({
      status: 400,
      error: error.message,
      headers: {
        ...Headers.headers,
        applicationJsonUTF8
      },
    }));
  };

  switch (request.method) {

    case 'GET':
    //block of code
    break;

    case 'HEAD':
    //block of code
    if (env !== 'production') {
      // Forbid snoopy requests
      response.status(401).json({
        status: 401,
        message: 'teapot',
        headers: {
          ...Headers.headers,
          applicationJsonUTF8
        },
      });
    } else {
      response.status(200).json({
        status: 200,
        message: 'ok',
        headers: {
          ...Headers.headers,
          applicationJsonUTF8
        },
      });
    };
    break;

    case 'OPTIONS':
    if (ua.isBot) {
      // Reject botty requests
      response.status(416).json({
        status: 416,
        message: 'teapot',
        headers: {
          ...Headers.headers,
          applicationJsonUTF8
        },
      });

    } else {
      // This is needed if you're planning to invoke your function from a browser.
      response.status(200).json({
        status: 200,
        message: 'ok',
        headers: {
          ...Headers.headers,
          applicationJsonUTF8
        },
      });
    };
    break;

    case 'POST':
    // Reject all POST requests
    response.status(401).json({
      status: 401,
      message: 'forbidden',
      headers: {
        ...Headers.headers,
        applicationJsonUTF8
      },
    });
    break;

    case 'PUT':
    // Reject all PUT requests
    response.status(401).json({
      status: 401,
      message: 'forbidden',
      headers: {
        ...Headers.headers,
        applicationJsonUTF8
      },
    });
    break;

    case 'DELETE':
    // Reject all DELETE requests
    response.status(401).json({
      status: 401,
      message: 'forbidden',
      headers: {
        ...Headers.headers,
        applicationJsonUTF8
      },
    });
    break;

    case 'PATCH':
    // Reject all PATCH requests
    response.status(401).json({
      status: 401,
      message: 'forbidden',
      headers: {
        ...Headers.headers,
        applicationJsonUTF8
      },
    });
    break;

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

    return console.log(response);
};
