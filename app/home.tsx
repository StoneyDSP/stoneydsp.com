// import { getSession, getUser } from '@/utils/supabase-server'
// import { getURL } from '@/utils/helpers'
// import { redirect } from 'next/navigation'

import HRGradient from "@/components/HRGradient"
import TextLargeBoldCenter from "@/components/TextLargeBoldCenter"
import RepoCards from "@/components/cards/RepoCards/RepoCards"
import ResourceCards from "@/components/cards/ResourceCards/ResourceCards"
import Footer from "@/components/Footer"

// import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function Home() {

  // const [ session, user, ] = await Promise.all([
  //   getSession(),
  //   getUser()
  // ])

  // if (!session) {
  //   return redirect(`${getURL()}login`)
  // }

  return (
    <div className="w-full flex flex-col items-center">

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">

        <div className="flex flex-col gap-8 text-foreground">
          <HRGradient />

          <TextLargeBoldCenter>
            Welcome to my workbench.
          </TextLargeBoldCenter>

          <HRGradient />

          <div className="flex flex-col items-center">

            <a href="https://github.com/nathanjhood">
              <img
                src="https://github-readme-stats-two-lime-18.vercel.app/api?username=nathanjhood&show_icons=true&theme=transparent"
                alt="StoneyDSP's GitHub stats"
                className="
                  git-stats-card
                  transition__glow
                "
              />
            </a>

          </div>

          <HRGradient />

          <ResourceCards />

          <HRGradient />

          <div className="flex flex-col items-center">

            <a href="https://github.com/nathanjhood">
              <img
                src="https://github-readme-stats-two-lime-18.vercel.app/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&theme=transparent&hide=tex,html"
                alt="StoneyDSP's Top Languages"
                className="
                  top-langs-card
                  transition__glow
                "
              />
            </a>
          </div>

          <HRGradient />

          <TextLargeBoldCenter>
            Here are some examples of my work:
          </TextLargeBoldCenter>

          <HRGradient />

          <RepoCards />

        </div>

        <HRGradient />

        <Footer />

        {/* <HRGradient /> */}

      </div>
    </div>
  )
}
