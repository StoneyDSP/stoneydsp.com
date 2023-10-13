import { getSession, getUser, getUserDetails } from '@/app/supabase-server'
import AccountForm from '@/app/account/account-form'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import '@/app/globals.css'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account',
}

export default async function Account() {

  const [ session, userDetails, user, ] = await Promise.all([
    getSession(),
    getUserDetails(),
    getUser(),
  ])

  if (!session) {
    return redirect('/login');
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <Link
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
          </Link>
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24">
        <AccountForm session={session} />
        <Footer />
      </div>
    </div>
  )
}
