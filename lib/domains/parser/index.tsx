import { NextRequest } from 'next/server'

export default function domainsParser(request: NextRequest) {

  // try {

    const url = request.nextUrl
    const headers = request.headers

    const port = url.port
    const searchParams = url.searchParams.toString()

    // // Test params for dev env (this header gets removed on dev server...)
    // if (process.env.VERCEL_ENV === 'development') {
    //   request.headers.set("host", "docs.localhost:3000")
    // }

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    let hostHeader = headers.get("host")!
    let hostName = hostHeader.replace(`.localhost`, `.${process.env.NEXT_PUBLIC_HOSTNAME}`)

    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`
    const next = url.searchParams.get('next') ?? '/'

    return { url, hostName, port, path, searchParams, next }

  // } catch(error) {

  //   console.log(`Middleware had a broken URL request: ${error} - redirecting to homepage`)

  //   const url = 'https://www.stoneydsp.com'
  //   const searchParams = ''
  //   const hostname = '.stoneydsp.com'
  //   const path = ''

  //   return { url, hostname, path, searchParams }
  // }
}
