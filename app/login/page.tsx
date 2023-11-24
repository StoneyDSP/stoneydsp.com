import AuthForm from '@/app/login/content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log In.',
  alternates: {
    canonical: new URL('login', getPublicSiteURL())
  }
}

export default async function LoginPage(): Promise<JSX.Element> {

  return (
    <AuthForm />
  )
}
