import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
// import '@/app/globals.css'
import styles from '@/app/projects/orfanidisbiquad/orfanidisbiquad.module.css'

export default async function OrfanidisbiquadContent() {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const markdown = `
# OrfanidisBiquad

v.1.1.0b.1 (10/06/2022)

[![OrfanidisBiquad](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=OrfanidisBiquad\&theme=transparent)](https://github.com/StoneyDSP/OrfanidisBiquad)

![Orf-AutoGUI-1-1-0b](https://raw.githubusercontent.com/StoneyDSP/OrfanidisBiquad/master/Res/Orf-AutoGUI-1-1-0b.png)

Available for testing! 

A refactor is on the cards to solve the maths involved - the current method does work, but I would not suggest it is an optimal approach, more rather a working prototype.
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
