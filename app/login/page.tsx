import { getSession } from '@/app/supabase-server'
import { redirect } from 'next/navigation'
// import Messages from './messages'
import AuthForm from './auth-form'
import BrandBadge from '@/components/StoneyDSPBadge'
import Footer from '@/components/Footer'
// import Link from 'next/link'

import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login',
}

export default async function Login() {

  const session = await getSession()

  if (session) {
    return redirect('/account')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">

      <div className="animate-in flex flex-col gap-8 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <div className="flex gap-8 justify-center items-center">
            <BrandBadge />
          </div>
          <div className="flex gap-8 justify-center items-center text-foreground py-8">
            <p>Systems, Web, Audio & Graphics</p>
          </div>
        </div>

        <AuthForm />

        {/* <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="email-form">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            id="email-form"
            required
          />
          <label className="text-md" htmlFor="password-form">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            autoComplete="current-password"
            id="password-form"
            required
          />
          <button className="bg-purple-700 rounded px-4 py-2 text-white mb-2">
            Sign In
          </button>
          <button
            formAction="/auth/sign-up"
            className="border border-gray-700 rounded px-4 py-2 text-white mb-2"
          >
            Sign Up
          </button>
          <Messages />
        </form> */}
        <Footer />
      </div>
    </div>
  )
}
