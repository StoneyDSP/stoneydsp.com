import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import {
    GitProjectCard
} from '@/components/cards'
import { Article } from '@/components/elements'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function AudiopluginsvfContent() {

  const mdxFetch = async (url: string) => {
    try {
      // MDX text - can be from a local file, database, CMS, fetch, anywhere...
      const res = await fetch(url)
      const markdown = await res.text()
      return markdown
    } catch (error) {
      // TypeError: Failed to fetch
      console.log(`Failed to fetch content ${url}:`, error)
      const markdown = `# 404: not found due to ${error}`
      return markdown
    }
  }

  const mdx = await mdxFetch('https://raw.githubusercontent.com/nathanjhood/AudioPlugin-SVF/main/README.md')

  return (
    <Article>
      <div className={styles.container}>

        <div className={styles.content}>

          <div className={styles.flexboxgrid}>

            <div className="grid grid-cols-1 gap-4">
              <GitProjectCard
                userName={'nathanjhood'}
                linkTo={'https://github.com/nathanjhood/OrfanidisBiquad.git'}
                altString={'Orfanidis Biquad'}
                repoName={'OrfanidisBiquad'}
              />
            </div>

            <MDXRemote source={mdx} />

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
