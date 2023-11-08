import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
import styles from '@/app/projects/cxxwin/cxxwin.module.css'

export default async function CxxwinContent() {

  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  // const res = await fetch('http://localhost:3000/markdown/projects/cxxwin/cxxwin.mdx')
  const res = await fetch('https://raw.githubusercontent.com/nathanjhood/CxxWin/main/README.md')
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
