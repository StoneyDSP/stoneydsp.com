import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
// import SupabaseLogo from '../components/SupabaseLogo'
// import NextJsLogo from '../components/NextJsLogo'
import DeployButton from '../components/DeployButton'
import BrandBadge from '@/components/StoneyDSPBadge'

import './globals.css'

import { Database } from './database.types'

export const dynamic = 'force-dynamic'

export default async function NavBar() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          {/* <DeployButton /> */}
          <BrandBadge />
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}
