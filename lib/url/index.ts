export const getPublicSiteURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

export const publicSiteUrl = getPublicSiteURL()

export const getVercelURL = () => {
  let url =
    process?.env?.VERCEL_ENV! !== 'development'
      ? process?.env?.VERCEL_URL! // Automatically set by Vercel.
      : 'localhost'
  return url
}

export const getSiteURL = () => {
  let url: string
  switch (process?.env?.VERCEL_ENV!) {
    case 'production': {
      url = process?.env?.NEXT_PUBLIC_SITE_URL!
    }
    case 'preview': {
      url = process?.env?.VERCEL_URL!
    }
    case 'development': {
      url = 'localhost'
    }
    default: {
      url = process?.env?.VERCEL_URL!
    }
  }
  return url
}

export const siteUrl = getSiteURL()
