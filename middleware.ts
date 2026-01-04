import { geolocation, ipAddress, next } from "@vercel/functions";
import { UAParser } from "ua-parser-js";
import { isBot } from "ua-parser-js/bot-detection";

const userAgent = (req: Request) => {
  const ua = req.headers.get("user-agent") ?? "";
  const parser = new UAParser(ua);
  return parser.getResult();
};

const logRequestToServer = (req: Request) => {
  const { ua } = userAgent(req);
  const reqIp = ipAddress(req);
  const geo = geolocation(req);

  const visitor = isBot(ua) ? "Bot" : "Human";
  const travelling = isBot(ua) ? "crawling" : "visiting";

  const country = geo?.country || "Earth";
  const city = geo?.city || "Nowhere";
  const region = geo?.region || "Somewhere";

  const ip = reqIp || "Visitor";
  const agent = req.headers.get("user-agent") || "Agent Unknown";

  console.log(
    `✓ ${visitor} ${ip} ${travelling} from ${city}, ${region}, ${country} with ${agent}.`
  );
};

export default function middleware(request: Request) {
  // IMPORTANT: clone headers (Request headers are not safely mutable everywhere)
  const requestHeaders = new Headers(request.headers);

  logRequestToServer(request);

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
