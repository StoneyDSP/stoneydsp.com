import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as Headers from './_shared/headers';
import * as Methods from './_shared/methods';
// import * as UserAgents from './_shared/useragents';

const applicationJsonUTF8 = {
  "Content-Type": "application/json; charset=utf-8"
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
  ) {
  // We will use this to filter out suspicious requests, such as
  // 'HEAD' on the preview branch/environment...
  const env = process.env.NODE_ENV;

  // const ua = UserAgents.userAgent(request.headers.toString['user-agent']);

  try {
    request.body;
  } catch (error) {
    // Error out now if the request is a mangled one...
    return console.log(response.status(400).json({
      status: 400,
      error: error.message,
      headers: {
        applicationJsonUTF8,
        ...Headers.headers,
      },
    }));
  };

  if ((request.method !== undefined) && !(Methods.isHTTPMethod(request.method))) {
    // Error out now if the request is a mangled one...
    return console.log(response.status(400).json({
      status: 400,
      error: "unknown HTTP method",
      headers: {
        applicationJsonUTF8,
        ...Headers.headers,
      },
    }));
  };

  switch (request.method) {

    // case Methods.HTTP_METHODS[0] /* 'GET' */:
    // // Reject all POST requests
    // response.status(200).json({
    //   status: 200,
    //   message: 'ok',
    //   headers: {
    //     applicationJsonUTF8,
    //     ...Headers.headers,
    //   },
    // });
    // break;

    case Methods.HTTP_METHODS[1] /* 'HEAD' */:
    if (env !== 'production') {
      // Forbid snoopy requests
      response.status(401).json({
        status: 401,
        message: 'teapot',
        headers: {
          applicationJsonUTF8,
          ...Headers.headers,
        },
      });
    } else {
      response.status(200).json({
        status: 200,
        message: 'ok',
        headers: {
          applicationJsonUTF8,
          ...Headers.headers,
        },
      });
    };
    break;

    // case Methods.HTTP_METHODS[2] /* 'OPTIONS' */:
    // // Reject all POST requests
    // response.status(200).json({
    //   status: 200,
    //   message: 'ok',
    //   headers: {
    //     applicationJsonUTF8,
    //     ...Headers.headers,
    //   },
    // });
    // break;

    case Methods.HTTP_METHODS[3] /* 'POST' */:
    // Reject all POST requests
    response.status(401).json({
      status: 401,
      message: 'forbidden',
      headers: {
        applicationJsonUTF8,
        ...Headers.headers,
      },
    });
    break;

    case Methods.HTTP_METHODS[4] /* 'PUT' */:
    // Reject all PUT requests
    response.status(401).json({
      status: 401,
      message: 'forbidden',
      headers: {
        applicationJsonUTF8,
        ...Headers.headers,
      },
    });
    break;

    case Methods.HTTP_METHODS[5] /* 'DELETE' */:
    // Reject all DELETE requests
    response.status(401).json({
      status: 401,
      message: 'forbidden',
      headers: {
        applicationJsonUTF8,
        ...Headers.headers,
      },
    });
    break;

    case Methods.HTTP_METHODS[6] /* 'PATCH' */:
    // Reject all PATCH requests
    response.status(401).json({
      status: 401,
      message: 'forbidden',
      headers: {
        applicationJsonUTF8,
        ...Headers.headers,
      },
    });
    break;

    default:
    // i.e., 'GET' or 'OPTIONS'
    response.status(200).json({
      status: 200,
      message: "default response",
      headers: {
        "Content-Type": "text/json; charset=utf-8",
        ...Headers.headers,
      },
    });
    };

    return response;
};
