import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import { Article } from '@/components/elements'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function BilineareqContent() {

  try {
    // MDX text - can be from a local file, database, CMS, fetch, anywhere...
    const res = await fetch('https://raw.githubusercontent.com/nathanjhood/BiLinearEQ/main/README.md')
    const markdown = await res.text()

    return (
      <Article>
        <div className={styles.container}>

          <div className={styles.content}>

            <div className={styles.flexboxgrid}>

              <div className='flex justify-center align-middle'>
                <MDXRemote source={`[![BiLinearEQ](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=BiLinearEQ\&theme=transparent)](https://github.com/nathanjhood/BiLinearEQ)`} />
              </div>

              <MDXRemote source={markdown} />

              <HRGradient />

              <BackToTop />

              <BackToHome />

              <HRGradient />

            </div>
          </div>
        </div>
      </Article>
    )
  } catch (error) {

    // TypeError: Failed to fetch
    console.log('Failed to fetch content:', error);
    const markdown = `# 404: not found due to ${error}`

    return (
      <Article>
        <div className={styles.container}>

          <div className={styles.content}>

            <div className={styles.flexboxgrid}>

              <div className='flex justify-center align-middle'>
                <MDXRemote source={`[![BiLinearEQ](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=BiLinearEQ\&theme=transparent)](https://github.com/nathanjhood/BiLinearEQ)`} />
              </div>

              <HRGradient />

              <MDXRemote source={markdown} />

              <HRGradient />

              <BackToTop />

              <BackToHome />

              <HRGradient />

            </div>
          </div>
        </div>
      </Article>
    )
  }
}
