import AuthError from "@/components/layouts/AuthError"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <AuthError searchParams={searchParams} />
  )
}
