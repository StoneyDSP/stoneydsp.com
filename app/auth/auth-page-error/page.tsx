export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <>
    <h2>There was an error...</h2>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </>
  )
}
