/**
 * Some friendly 200 status code text bodies for various http requests.
 *
 * - GET: "The resource has been fetched and is transmitted in the message body.",
 * - HEAD: "The representation headers are included in the response without any message body.",
 * - POST: "The resource describing the result of the action is transmitted in the message body.",
 * - TRACE: "The message body contains the request message as received by the server.",
 *
 * The successful result of a PUT or a DELETE is often not a 200 OK,
 * but a 204 No Content (or a 201 Created when the resource is uploaded
 * for the first time).
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
 */
const okCodes = (method: string) => {

  let msg: string = ""

  switch (method) {

    case "GET":
      msg = "The resource has been fetched and is transmitted in the message body."
      break

    case "HEAD":
      msg = "The representation headers are included in the response without any message body."
      break

    case "POST":
      msg = "The resource describing the result of the action is transmitted in the message body."
      break

    case "TRACE":
      msg = "The message body contains the request message as received by the server."
      break

    default:
      break
  }

  return msg
}

export default okCodes
