/** Credit: https://github.com/Sprokets/nextjs-csp-report-only */
export default function generateCsp() {
  // generate random nonce converted to base64. Must be different on every HTTP page load
  // const nonce = crypto.randomBytes(16).toString('base64')
  // const nonce = crypto.randomUUID();

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const csp = [
    { name: "default-src", values: ["'self'"] },
    {
      name: "script-src",
      values: [
        "'report-sample'",
        "'self'",
        `'nonce-${nonce}'`,
        "'strict-dynamic'",
      ],
    },
    {
      name: "style-src",
      values: ["'report-sample'", "'self'", `'nonce-${nonce}'`],
    },
    {
      name: "connect-src",
      values: ["'self'", "*.vercel-insights.com", "plausible.io"],
    },
    { name: "font-src", values: ["'self'", "data:"] },
    { name: "img-src", values: ["'self'", "*.gh-readme-stats.com", "data:"] },
    { name: "worker-src", values: ["'self'", "blob:"] },
    { name: "frame-ancestors", values: ["'none'"] },
    { name: "form-action", values: ["'self'"] },
  ];

  const cspString = csp
    .map((directive) => {
      return `${directive.name} ${directive.values.join(" ")}`;
    })
    .join("; ");

  return { csp: cspString, nonce };
}

export const createHashedNonce = async (nonce: string) => {
  const encoder = new TextEncoder()
  const encodedNonce = encoder.encode(nonce) // Encode the nonce
  const hash = await crypto.subtle.digest('SHA-256', encodedNonce) // Hash it with SHA-256
  const bytes = new Uint8Array(hash)
  const hashedNonce = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0')) // Convert the hash to a hexadecimal string
    .join('')
  return hashedNonce
}

function oldCSP() {
  // Generate a random nonce
  // Use 'nonce' when invoking the supabase.auth.signInWithIdToken() method
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  // Use 'hashedNonce' when making the authentication request to Google
  const hashedNnonce = createHashedNonce(nonce)

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()
}
