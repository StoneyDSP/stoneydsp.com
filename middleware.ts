import { geolocation, ipAddress, next } from "@vercel/functions";

function isProbablyBot(req: Request): boolean {
  const ua = (req.headers.get("user-agent") ?? "").toLowerCase();

  // Common bot keywords
  const uaLooksBot =
    /bot|crawler|spider|crawling|slurp|bingpreview|duckduckbot|yandex|baiduspider|facebookexternalhit|twitterbot|discordbot|slackbot|telegrambot|whatsapp|pinterest|embedly|quora link preview|applebot|petalbot/.test(
      ua
    );

  // Some automated fetchers omit UA or send super-generic ones
  const uaMissingOrOdd = ua.length === 0 || ua === "node" || ua === "undici";

  // "sec-fetch" headers usually exist for real browser navigations
  const hasBrowserFetchMetadata =
    req.headers.has("sec-fetch-site") ||
    req.headers.has("sec-fetch-mode") ||
    req.headers.has("sec-fetch-dest") ||
    req.headers.has("sec-ch-ua");

  // If it looks like a bot OR the UA is weird and it lacks browser metadata
  return uaLooksBot || (uaMissingOrOdd && !hasBrowserFetchMetadata);
}

function shortUA(ua: string, max = 120) {
  if (ua.length <= max) return ua;
  return ua.slice(0, max - 1) + "…";
}

function logRequestOnServer(url: URL, request: Request) {
  const geo = geolocation(request);
  const ip = ipAddress(request); // optional: remove if you don't want it
  const ua = request.headers.get("user-agent") ?? "";

  const bot = isProbablyBot(request);
  const visitor = bot ? "Bot" : "Human";
  const action = bot ? "crawling" : "visiting";

  const country = geo?.country || "Earth";
  const region = geo?.region || "Somewhere";
  const city = geo?.city || "Nowhere";

  console.log(
    `✓ ${visitor} ${action}: ${country}, ${city}, ${region}, — ip=${ip ?? "?"} — ${url.pathname} — ua="${shortUA(
      ua
    )}"`
  );
}

export default function middleware(request: Request) {
  const url = new URL(request.url);

  // // Avoid logging asset noise
  // // (matcher below already helps, but this is an extra guard)
  // if (
  //   url.pathname.startsWith("/assets/") ||
  //   url.pathname.startsWith("/static/")
  // ) {
  //   return next();
  // }

  // IMPORTANT: clone headers (Request headers are not safely mutable everywhere)
  const requestHeaders = new Headers(request.headers);

  logRequestOnServer(url, request);

  if (url.pathname === "/about") {
    // choose one:
    // return new Response("Gone", { status: 410 });
    return Response.redirect(new URL("/", url.origin), 301);
  }

  /// continue chain (NextResponse.next equivalent)
  return next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // runtime: "nodejs", // optional: use 'nodejs' or omit for 'edge' (default)
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!_next/|assets/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
