import { Metadata } from 'next'
import AuthForm from '@/components/layouts/AuthForm'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log In.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/login'
  }
}

export default async function LoginPage(): Promise<JSX.Element> {

  return (
    <AuthForm />
  )
}
