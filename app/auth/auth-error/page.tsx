import AuthError from '@/components/layouts/AuthError'

export default async function AuthErrorPage({ searchParams }: {
  searchParams: {
      message: string
  }
}): Promise<JSX.Element> {

  return (
    <AuthError searchParams={searchParams} />
  )
}
