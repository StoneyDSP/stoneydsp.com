import Messages from './messages'
import BrandBadge from '@/components/StoneyDSPBadge'
import Footer from '@/components/Footer'
// import Link from 'next/link'

import { Metadata } from 'next'
// import Logo from '@/components/Logo'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {

  // const nonce = headers().get('x-nonce')

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          {/* <Link
            href="/"
            className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{' '}
            Back
          </Link> */}
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-8 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <div className="flex gap-8 justify-center items-center">
            <BrandBadge />
          </div>
          <div className="flex gap-8 justify-center items-center text-foreground py-8">
            <p>Systems, Web, Audio & Graphics</p>
          </div>
          {/* <Logo /> */}
        </div>

        <form
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
        </form>
        <Footer />
      </div>
    </div>
  )
}
