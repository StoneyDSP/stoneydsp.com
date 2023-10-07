/**
 * List of valid HTTP headers that can be implemented.
 */
export const HTTP_STATUS_CODES = [
  // Information responses
  "Continue",
  "Switching Protocols",
  "Processing",
  "Early Hints",
  // Successful responses
  "OK",
  "Created",
  "Accepted",
  "Non-Authoritative Information",
  "No Content",
  "Reset Content",
  "Partial Content",
  "Multi-Status",
  "Already Reported",
  "IM Used",
  // Redirection messages
  "Multiple Choices",
  "Moved Permanently",
  "Found",
  "See Other",
  "Not Modified",
  "Use Proxy",
  "(unused)",
  "Temporary Redirect",
  "Permanent Redirect",
  // Client error responses
  "Bad Request",
  "Unauthorized",
  "Payment Required",
  "Forbidden",
  "Not Found",
  "Method Not Allowed",
  "Not Acceptable",
  "Proxy Authentication Required",
  "Request Timeout",
  "Conflict",
  "Gone",
  "Length Required",
  "Precondition Failed",
  "Payload Too Large",
  "URI Too Long",
  "Unsupported Media Type",
  "Range Not Satisfiable",
  "Expectation Failed",
  "I'm a teapot",
  "Misdirected Request",
  "Unprocessable Content",
  "Locked",
  "Failed Dependency",
  "Too Early",
  "Upgrade Required",
  "Precondition Required",
  "Too Many Requests",
  "Request Header Fields Too Large",
  "Unavailable For Legal Reasons",
  // Server error responses
  "Internal Server Error",
  "Not Implemented",
  "Bad Gateway",
  "Service Unavailable",
  "Gateway Timeout",
  "HTTP Version not Supported",
  "Variant Also Negotiates",
  "Insufficient Storage",
  "Loop Detected",
  "Not Extended",
  "Network Authentication Required"
] as const;

/**
 * A type representing the valid HTTP status codes that can be implemented.
 */
export type HTTP_STATUS_CODE = (typeof HTTP_STATUS_CODES)[number]

/**
 * Checks to see if the passed string is an HTTP header. Note that this is case
 * sensitive.
 *
 * @param maybeCode the string that may be an HTTP status code
 * @returns true if the string is an HTTP status code
 */
export function isHTTPHeader(maybeCode: string): maybeCode is HTTP_STATUS_CODE {
  return HTTP_STATUS_CODES.includes(maybeCode as HTTP_STATUS_CODE)
}

// const code: HTTP_STATUS_CODE = 200;
