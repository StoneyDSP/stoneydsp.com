import { NextRequest } from 'next/server'
import parseError from '@/lib/parse/error';

const parseNextRequest = async (request: NextRequest): Promise<{
  data: { request: NextRequest; };
  error: null;
} | {
  data: { request: NextRequest; };
  error: Error | EvalError | RangeError | ReferenceError | SyntaxError | TypeError | URIError | AggregateError | null;
}> => {

  // let error: Error | null = null

  let localError: null | Error | EvalError | RangeError | ReferenceError | SyntaxError | TypeError | URIError | AggregateError = null

  try {

  const data = {
    request: {
      // Internals (NextJs-specific)
      nextUrl: request.nextUrl,
      cookies: request.cookies,
      geo: request.geo,
      ip: request.ip,
      url: request.url,

      // Request API methods
      arrayBuffer: () => request.arrayBuffer(),
      blob: () => request.blob(),
      clone: () => request.clone(),
      formData: () => request.formData(),
      json: () => request.json(),
      text: () => request.text(),

      // Request API members
      body: request.body,
      bodyUsed: request.bodyUsed,
      cache: request.cache,
      credentials: request.credentials,
      destination: request.destination,
      headers: request.headers,
      integrity: request.integrity,
      method: request.method,
      mode: request.mode,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      signal: request.signal,
    },
  }
} catch(e) {
  const { error } = parseError(e)
  localError = error
  localError.name = error.name
  localError.cause = error.cause
  localError.message = error.message
  localError.stack = error.stack

}

  const error = localError

  return { data: { request }, error }
}

export default parseNextRequest
