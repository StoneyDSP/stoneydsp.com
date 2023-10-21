import { getSession, getUser, getUserDetails } from '@/app/supabase-server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import LogoutButton from '@/components/LogoutButton'
import BrandBadge from '@/components/StoneyDSPBadge'
import Footer from '@/components/Footer'
import RepoCards from '@/components/cards/RepoCards/RepoCards'
import ResourceCards from '@/components/cards/ResourceCards/ResourceCards'
import TextLargeBoldCenter from '@/components/TextLargeBoldCenter'
import HRGradient from '@/components/HRGradient'

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
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <BrandBadge />
          <NavBar />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/account" target="_self">Hey, {user.email}! ({session.user.role})</Link>
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
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">

        <div className="flex flex-col gap-8 text-foreground">
          <HRGradient />
          <TextLargeBoldCenter>
            Welcome to my workbench.
          </TextLargeBoldCenter>
          <HRGradient />
          <ResourceCards />
        </div>

        <div className="flex flex-col gap-8 text-foreground">
          <HRGradient />
          <TextLargeBoldCenter>
            Here are some examples of my work:
          </TextLargeBoldCenter>
          <HRGradient />
          <RepoCards />
        </div>

        {/* <HRGradient /> */}

        <Footer />

        {/* <HRGradient /> */}

      </div>
    </div>
  )
}
