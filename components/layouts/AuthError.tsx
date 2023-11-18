'use client'
import 'client-only'
import { Suspense } from 'react'

export default function AuthError({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <Suspense>
    <h2>There was an error...</h2>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </Suspense>
  )
}
