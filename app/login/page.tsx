import Login from '@/app/login/login'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log In.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/login'
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  return (
    <Login searchParams={searchParams} />
  )
}
