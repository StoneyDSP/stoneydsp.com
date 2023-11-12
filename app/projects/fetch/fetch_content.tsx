import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import { Article } from '@/components/elements'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function FetchContent() {

  // // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  // const res = await fetch('https://raw.githubusercontent.com/nathanjhood/Biquads/main/README.md')
  // const markdown = await res.text()

  try {

    // Simple typo to test error...
    const res = await fetch('https://raw.githubusercontent.com/nathanjhood/Biquads/main/READEM.md')
    const markdown = await res.text()

    return (
      <Article>
        <div className={styles.container}>

          <div className={styles.content}>

            <div className={styles.flexboxgrid}>

              {/* <div className='flex justify-center align-middle'>
                <MDXRemote source={`[![Biquads](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=Biquads\&theme=transparent)](https://github.com/nathanjhood/Biquads)`} />
              </div> */}

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
  } catch (error) {

    // TypeError: Failed to fetch
    console.log('Failed to fetch content:', error);
    const markdown = `# 404: not found due to ${error}`

    return (
      <Article>
        <div className={styles.container}>

          <div className={styles.content}>

            <div className={styles.flexboxgrid}>

              {/* <div className='flex justify-center align-middle'>
                <MDXRemote source={`[![Biquads](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=Biquads\&theme=transparent)](https://github.com/nathanjhood/Biquads)`} />
              </div> */}

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
