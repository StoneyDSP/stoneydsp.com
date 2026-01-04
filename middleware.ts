import { geolocation, ipAddress, next } from "@vercel/functions";
import { UAParser } from "ua-parser-js";

function isProbablyBot(ua: string) {
  return /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|discordbot|twitterbot|applebot|petalbot/i.test(
    ua
  );
}

const userAgent = (req: Request) => {
  const ua = req.headers.get("user-agent") ?? "";
  const parser = new UAParser(ua);
  return parser.getResult();
};

const logRequestToServer = (req: Request) => {
  const { ua } = userAgent(req);
  const ip = ipAddress(req);
  const geo = geolocation(req);

  const visitor = isProbablyBot(ua) ? "Bot" : "Human";
  const action = isProbablyBot(ua) ? "crawling" : "visiting";

  console.log(
    `✓ ${visitor} ${ip} ${action} from ${geo?.city ?? "Nowhere"}, ${geo?.region ?? "Somewhere"}, ${
      geo?.country ?? "Earth"
    } with ${ua || "Agent Unknown"}.`
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
