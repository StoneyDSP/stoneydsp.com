import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import { Article } from '@/components/elements'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function NonlinearfiltersContent() {

  try {
    // MDX text - can be from a local file, database, CMS, fetch, anywhere...
    const res = await fetch('https://raw.githubusercontent.com/nathanjhood/NonLinearFilters/main/README.md')
    const markdown = await res.text()

    return (
      <Article>
        <div className={styles.container}>

          <div className={styles.content}>

            <div className={styles.flexboxgrid} id=''>

              <div className='flex justify-center align-middle'>
                <MDXRemote source={`[![NonLinearFilters](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=NonLinearFilters\&theme=transparent)](https://github.com/nathanjhood/NonLinearFilters)`} />
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
                <MDXRemote source={`[![NonLinearFilters](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=NonLinearFilters\&theme=transparent)](https://github.com/nathanjhood/NonLinearFilters)`} />
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
