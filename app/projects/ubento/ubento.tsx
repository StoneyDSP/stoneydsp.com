import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
import styles from '@/app/projects/ubento/ubento.module.css'

export default async function UbentoContent() {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const markdown = `
# UBento

Minimal, bento-box style Ubuntu-based WSL distro front-end, ideal for targeting Linux-style NodeJs and CMake development environments from Windows platforms.

[![UBento](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=UBento\&theme=transparent)](https://github.com/StoneyDSP/UBento)
`

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
