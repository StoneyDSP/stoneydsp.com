import AuthError from '@/app/auth/auth-error/content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authorization Error',
  description: 'Error authorizing user session.',
  alternates: {
    canonical: new URL('/auth/auth-error', getPublicSiteURL())
  }
}

export default async function AuthErrorPage({ searchParams }: {
  searchParams: {
      message: string
  }
}): Promise<JSX.Element> {

  return (
    <AuthError searchParams={searchParams} />
  )
}
