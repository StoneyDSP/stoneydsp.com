import { headers, cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import HRGradient from '@/components/layouts/HRGradient'
import { Title, Text } from '@/lib/Typography'
// import customStorageAdapter from '@/lib/supabase/storage'

export const dynamic = 'force-dynamic'

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">

      <HRGradient />

      <Title level={1} className='text-center drop-shadow ' tabIndex={0}>
        Welcome!
      </Title>

      <HRGradient />

      <div className='py-4'></div>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        // action={signIn}
        action="/edge/auth/v1/signin" method="post"
      >

        <label className="text-foreground" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />

        <label className="text-foreground" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <HRGradient />

        <button className="
          transition-colors
          bg-green-600
          hover:bg-purple-500
          border
          border-foreground/20
          rounded-md
          px-4
          py-2
          mb-2
          drop-shadow
          hover:drop-shadow-none
          "
        >
          <span className='text-white mb-2 drop-shadow hover:drop-shadow-none'>
            Sign&nbsp;In
          </span>
        </button>
      </form>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        // action={signIn}
        action="/auth/v1/signup" method="post"
      >

        <button
          // formAction={signUp}
          className="
            transition-colors
            bg-green-600
            hover:bg-purple-500
            border
            border-foreground/20
            rounded-md
            px-4
            py-2
            mb-2
            drop-shadow
            hover:drop-shadow-none
            "
        >
          <span className='text-white mb-2 drop-shadow hover:drop-shadow-none'>
            Sign&nbsp;Up
          </span>

        </button>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}

      </form>

      <HRGradient />

      <div className='py-2'></div>

      <HRGradient />

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        // action={signInWithGithub}
        action="/auth/v1/providers/github" method="post"
      >
        <button
          className="
          transition-colors
          bg-green-600
          hover:bg-purple-500
          border
          border-foreground/20
          rounded-md
          px-4
          py-2
          mb-2
          drop-shadow
          hover:drop-shadow-none
          "
        >
          <span className='text-white mb-2 drop-shadow hover:drop-shadow-none'>
            Sign&nbsp;In&nbsp;with&nbsp;GitHub
          </span>
        </button>
      </form>

      <HRGradient />

    </div>
  )
}
