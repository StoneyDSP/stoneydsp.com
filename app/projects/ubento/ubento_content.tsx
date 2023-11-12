import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import { Article } from '@/components/elements'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function UbentoContent() {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const markdown = `
# UBento

Minimal, bento-box style Ubuntu-based WSL distro front-end, ideal for targeting Linux-style NodeJs and CMake development environments from Windows platforms.
`

  return (
    <Article>
      <div className={styles.container}>

        <div className={styles.content}>

          <div className={styles.flexboxgrid}>

            <div className='flex justify-center align-middle'>
              <MDXRemote source={`[![UBento](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=UBento\&theme=transparent)](https://github.com/StoneyDSP/UBento)`} />
            </div>

            <HRGradient />

            <MDXRemote source={markdown} />

            <HRGradient />

            <BackToHome />

            <HRGradient />

          </div>
        </div>
      </div>
    </Article>
  )
}
