
import { getSession, getUser, getUserDetails } from '@/app/supabase-server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/menus/navbar/NavBar'
import LogoutButton from '@/components/LogoutButton'
import BrandBadge from '@/components/StoneyDSPBadge'
import RepoCards from '@/components/cards/repos/Repocards'
import Footer from '@/components/Footer'
import ResourcesCards from '@/components/cards/resources/ResourcesCards'

export const dynamic = 'force-dynamic'

export default async function Index() {

  const nonce = headers().get('x-nonce')

  const [ session, user, userDetails, ] = await Promise.all([
    getSession(),
    getUser(),
    getUserDetails(),
  ])

  if (!session) {
    return redirect('/login')
  }

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar />

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <div className="flex gap-8 justify-center items-center">
            <Link href="#" target="_blank">
              <BrandBadge />
            </Link>
          </div>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Welcome to my workbench.
          </h2>
          <ResourcesCards />
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Here are some examples of my work:
          </h2>
          <RepoCards />
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <Footer />

      </div>
    </div>
  )
}
