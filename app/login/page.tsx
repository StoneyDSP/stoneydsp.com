import AuthForm from '@/app/login/content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const title = 'Login'
export const description = 'Log In.'
export const canonical = new URL('login', getPublicSiteURL())

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: canonical
  }
}

export default async function LoginPage(): Promise<JSX.Element> {

  return (
    <AuthForm />
  )
}
