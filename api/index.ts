import type { VercelRequest, VercelResponse, VercelApiHandler } from '@vercel/node';
import * as Headers from './_shared/headers';
import * as Methods from './_shared/methods';
import * as Statuses from './_shared/statuses';
// import * as UserAgents from './_shared/useragents';
import voidHandler, {
  getHandler,
  headHandler,
  optionsHandler,
  postHandler,
  putHandler,
  deleteHandler,
  patchHandler
} from './_shared/handlers/index';

const applicationJsonUTF8 = {
  "Content-Type": "application/json; charset=utf-8"
};

export default async function VercelApiHandler(
  request: VercelRequest,
  response: VercelResponse
  ) {

  response.setHeader('Content-Type', 'application/json');

  // We will use this to filter out suspicious requests, such as
  // 'HEAD' on the preview and development branches/environments...
  const env = process.env.NODE_ENV;

  // const ua = UserAgents.userAgent(request.headers.toString['user-agent']);

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

  switch (request.method)
  {
    /* 'GET' */
    case Methods.HTTP_METHODS[0]:

      getHandler(request, response);

    break;

    /* 'HEAD' */
    case Methods.HTTP_METHODS[1]:

      headHandler(request, response);

    break;

    /* 'OPTIONS' */
    case Methods.HTTP_METHODS[2]:

      optionsHandler(request, response);

    break;

    /* 'POST' */
    case Methods.HTTP_METHODS[3]:

      postHandler(request, response);

    break;

    /* 'PUT' */
    case Methods.HTTP_METHODS[4]:

      putHandler(request, response);

    break;

    /* 'DELETE' */
    case Methods.HTTP_METHODS[5]:

      deleteHandler(request, response);

    break;

    /* 'PATCH' */
    case Methods.HTTP_METHODS[6]:

      patchHandler(request, response);

    break;

    /* '<void>' */
    default:

      voidHandler(request, response);

    break;

  };

  console.log(request, response);

  return response.status(200).send(request.query);
};
