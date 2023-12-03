import { Metadata } from 'next'
import { getPublicSiteURL } from '@/utils/headers/URL'
import Login from './content'
// import AuthForm from './auth-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL('/projects', getPublicSiteURL())
  }
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  try {

    return (
      <Login searchParams={searchParams} />
    )

    // return (<AuthForm />)

  } catch(e) {

    const error: any = e
    console.log(` \u{2715} LoginPage() - :: Error returning new ${metadata.title} Page: ${error}`)
    throw new Error(error)
  }
}
