import { NextRequest } from 'next/server'

export default async function parseRequest(request: NextRequest) {

  try {

    const url = request.url

    const nextUrl = request.nextUrl

    // // Test params for dev env (this header gets removed on dev server...)
    // if (process.env.VERCEL_ENV === 'development') {
    //   request.headers.set("host", "docs.localhost:3000")
    // }

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    let hostname = request.headers
      .get("host")!
      .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

    const searchParams = nextUrl.searchParams.toString()

    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${nextUrl.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`

    return { url, hostname, path, searchParams }

  } catch(error) {

    console.log(`Middleware had a broken URL request: ${error} - redirecting to homepage`)

    const url = 'https://www.stoneydsp.com'
    const searchParams = ''
    const hostname = '.stoneydsp.com'
    const path = ''

    return { url, hostname, path, searchParams }
  }
}
