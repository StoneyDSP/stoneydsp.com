import { geolocation, ipAddress } from "@vercel/functions";
import { generateCSP, headersDefaults, setHeaders } from "./lib/headers";
import { userAgent } from "./lib/isBot";

const logRequestToServer = (req: Request) => {
  "use server";
  const { isBot } = userAgent(req);
  const reqIp = ipAddress(req);
  const geo = geolocation(req);
  const visitor = isBot ? "Bot" : "Human";
  const travelling = isBot ? "crawling" : "visiting";
  const country = (geo && geo.country) || "Earth";
  const city = (geo && geo.city) || "Nowhere";
  const region = (geo && geo.region) || "Somewhere";
  const ip = reqIp || "Visitor";
  const agent = req.headers.get("user-agent") || "Agent Unknown";

  if (process.env.VERCEL_ENV === "development") {
    console.log(` \u{2713} ${req.method} ${req.url}`);
  } else {
    console.log(
      ` \u{2713} ${visitor} ${ip} ${travelling} from ${city}, ${region}, ${country} with ${agent}.`
    );
  }
};

export default function middleware(request: Request) {
  // console.log("Request to:", request.url);
  const date = new Date();

  const { csp, nonce } = generateCSP();

  request.headers.set(
    "X-StoneyDSP-Middleware-Request",
    `${date.toUTCString()}`
  );
  request.headers.set("Content-Security-Policy", csp);
  request.headers.set("X-Data-Nonce", nonce);

  headersDefaults.forEach((headerDefault) => {
    setHeaders(request, headerDefault);
  });

  // Create an unmodified response
  const response = new Response(null, {
    headers: request.headers,
  });

  response.headers.set(
    "X-StoneyDSP-Middleware-Response",
    `${date.toUTCString()}`
  );
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Data-Nonce", nonce);

  headersDefaults.forEach((headerDefault) => {
    setHeaders(response, headerDefault);
  });

  logRequestToServer(request);

  return response;
}

export const config = {
  runtime: "nodejs", // optional: use 'nodejs' or omit for 'edge' (default)
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)", //
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
