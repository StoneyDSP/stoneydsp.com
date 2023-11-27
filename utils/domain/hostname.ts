import { type NextRequest } from "next/server"

/**
 * https://github.com/vercel/examples/blob/main/edge-middleware/hostname-rewrites/middleware.ts
 */
const hostnamesDB = [
  {
    name: 'Site 1',
    description: 'Subdomain + custom domain',
    subdomain: 'subdomain-1',
    customDomain: 'custom-domain-1.com',
    // Default subdomain for Preview deployments and for local development
    defaultForPreview: true,
  },
  {
    name: 'Site 2',
    description: 'Subdomain only',
    subdomain: 'subdomain-2',
  },
  {
    name: 'Site 3',
    description: 'Subdomain only',
    subdomain: 'subdomain-3',
  },
]
const DEFAULT_HOST = hostnamesDB.find((h) => h.defaultForPreview)

/**
 * Returns the data of the hostname based on its subdomain or custom domain
 * or the default host if there's no match.
 *
 * This method is used by middleware.ts
 */
export async function getHostnameDataOrDefault(
  subdomainOrCustomDomain?: string | false
) {
  if (!subdomainOrCustomDomain) return DEFAULT_HOST

  // check if site is a custom domain or a subdomain
  const customDomain = subdomainOrCustomDomain.includes('.')

  // fetch data from mock database using the site value as the key
  return (
    hostnamesDB.find((item) =>
      customDomain
        ? item.customDomain === subdomainOrCustomDomain
        : item.subdomain === subdomainOrCustomDomain
    ) ?? DEFAULT_HOST
  )
}

/**
 * Returns the data of the hostname based on its subdomain.
 *
 * This method is used by pages under middleware.ts
 */
export async function getHostnameDataBySubdomain(subdomain: string) {
  return hostnamesDB.find((item) => item.subdomain === subdomain)
}

/**
 * Returns the paths for `getStaticPaths` based on the subdomain of every
 * available hostname.
 */
export async function getSubdomainPaths() {
  // get all sites that have subdomains set up
  const subdomains = hostnamesDB.filter((item) => item.subdomain)

  // build paths for each of the sites in the previous two lists
  return subdomains.map((item) => {
    return { params: { site: item.subdomain } }
  })
}

export default hostnamesDB

export async function getCurrentHost(request: NextRequest) {

  const url = request.nextUrl

  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = request.headers.get('host')

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  // (in the case of "test.vercel.app", "vercel.app" is the root URL)
  const currentHost =
    process?.env?.NODE_ENV === 'production' &&
    hostname?.replace(`.${process?.env?.ROOT_DOMAIN}`, '')

  const data = await getHostnameDataOrDefault(currentHost)

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents.
  if (url.pathname.startsWith(`/_sites`)) {
    url.pathname = `/404`
  } else {
    console.log('URL 2', request.nextUrl.href)
    // rewrite to the current subdomain under the pages/sites folder
    url.pathname = `/_sites/${data?.subdomain}${url.pathname}`
  }

  return url
}
