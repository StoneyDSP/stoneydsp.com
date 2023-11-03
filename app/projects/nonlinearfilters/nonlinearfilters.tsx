import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
// import '@/app/globals.css'
import styles from '@/app/projects/nonlinearfilters/nonlinearfilters.module.css'

export default async function NonlinearfiltersContent() {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const markdown = `
# Non-Linear Filters

+ Initial implementation of non-linear 1st- and 2nd- order filters are up and ready to go...
+ More coming soon!

[![NonLinearFilters](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=NonLinearFilters\&theme=transparent)](https://github.com/nathanjhood/NonLinearFilters)

...stay tuned for more!

I will try to take some breaks inbetween GUI work and other errands in order to provide some interesting write-ups on the core module at play here - and the many myriad use cases that module has ahead :) - but life is generally busy and I only do this in my spare time, so please stay tuned :)

- Nathan (StoneyDSP) June 2022
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
