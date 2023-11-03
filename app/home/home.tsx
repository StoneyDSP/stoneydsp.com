import {
  RepoCards,
  ResourceCards
} from '@/components/cards'
import {
  HRGradient,
  TextLargeBoldCenter,
  FlexColCenter
} from '@/components/layouts'

import Image from 'next/image'

// import { headers } from 'next/headers'

import styles from './home.module.css'

export const dynamic = 'force-dynamic'

export default async function Home() {

  // const nonce = headers().get('x-nonce')

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

          <HRGradient />

          <TextLargeBoldCenter>
            Hi! I&#39;m Nathan, a.k.a StoneyDSP.
          </TextLargeBoldCenter>

          <HRGradient />

          <FlexColCenter>
            <a href="https://github.com/nathanjhood">
              <Image
                src="https://github-readme-stats-two-lime-18.vercel.app/api?username=nathanjhood&show_icons=true&theme=transparent&border_radius=0&hide_border=true"
                alt="StoneyDSP's GitHub stats"
                className="transition___shadow_off rounded-lg border hover:border-foreground"
              />
            </a>
          </FlexColCenter>

          <HRGradient />

          <TextLargeBoldCenter>
            Welcome to my workbench.
          </TextLargeBoldCenter>

          <HRGradient />

          <ResourceCards />

          <HRGradient />

          <HRGradient />

          <FlexColCenter>
            <a href="https://github.com/nathanjhood">
              <Image
                src="https://github-readme-stats-two-lime-18.vercel.app/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&theme=transparent&hide=tex,html&border_radius=0&hide_border=true"
                width={350}
                height={311}
                alt="StoneyDSP's Top Languages"
                className="transition___shadow_off rounded-lg border hover:border-foreground"
              />
            </a>
          </FlexColCenter>

          <HRGradient />

          <TextLargeBoldCenter>
            Here are some examples of my work:
          </TextLargeBoldCenter>

          <HRGradient />

          <RepoCards />

        </div>

        <HRGradient />

      </div>

    </div>
  )
}
