import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
import styles from '@/app/projects/biquads/biquads.module.css'

export default async function BiquadsContent() {

  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  // const res = await fetch('http://localhost:3000/markdown/projects/biquads/biquads.mdx')
  const res = await fetch('https://raw.githubusercontent.com/nathanjhood/Biquads/main/README.md')
  const markdown = await res.text()

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

          <HRGradient />

          <MDXRemote source={`[![Biquads](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=Biquads\&theme=transparent)](https://github.com/StoneyDSP/Biquads)`} />

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
