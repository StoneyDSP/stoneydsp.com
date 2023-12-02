import { NextResponse, type NextRequest } from 'next/server'
import { SupabaseClient } from '@supabase/supabase-js'

/** Get hostname of request (e.g. ```demo.vercel.pub```, ```demo.localhost:3000)``` */
const getHostname = (request: NextRequest) => {

  let hostname = request.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }
  return hostname
}

export default async function middlewareRedirect(
  request: NextRequest,
  supabase: SupabaseClient<any, "public", any>
): Promise<NextResponse<unknown>> {

  const url = request.nextUrl
  const searchParams = url.searchParams.toString()

  const session = await supabase.auth.getSession()

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = getHostname(request)

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    if (!session && path !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (session && path == "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, request.url),
    );
  }

  // rewrite root application to `/www` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/www${path === "/" ? "" : path}`, request.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url));
}
