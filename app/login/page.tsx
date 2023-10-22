import { getSession } from '@/app/supabase-server'
import { redirect } from 'next/navigation'
import AuthForm from './supabase-auth'
import BrandBadge from '@/components/StoneyDSPBadge'
import Footer from '@/components/Footer'

import { Metadata } from 'next'
import { getURL } from '@/utils/helpers'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login',
}

export default async function Login() {

  const session = await getSession()

  if (session) {
    // return redirect('/account')
    return redirect(getURL())
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">

      <div className="animate-in flex flex-col gap-4 opacity-0 max-w-4xl px-3 py-4 lg:py-8 text-foreground">

        <div className="flex flex-col items-center">

          <div className="flex justify-center items-center">
            <BrandBadge />
          </div>

          <div className="flex justify-center items-center text-foreground pt-8">

            <p>Systems, Web, Audio & Graphics</p>
          </div>

        </div>

        <AuthForm />

        <Footer />
      </div>
    </div>
  )
}
