import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
// import '@/app/globals.css'
import styles from '@/app/projects/audioplugin-svf/audioplugin-svf.module.css'

export default async function AudiopluginsvfContent() {
  
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const res = await fetch('/markdown/projects/audioplugin-svf.mdx')
  const markdown = await res.text()

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

          <HRGradient />

          <MDXRemote source={markdown} />

          <HRGradient />

          <BackToHome />

          <HRGradient />

        </div>
      </div>
    </div>
  )
}
