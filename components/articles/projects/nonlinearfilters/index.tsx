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
import mdxFetch from '@/utils/mdx/mdxFetch'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function NonlinearfiltersContent() {

  const mdx = await mdxFetch('https://raw.githubusercontent.com/nathanjhood/NonLinearFilters/main/README.md')

  return (
    <Article>
      <div className={styles.container}>

        <div className={styles.content}>

          <div className={styles.flexboxgrid} id=''>

            <HRGradient />

            <div className="grid grid-cols-1 gap-4">
              <GitProjectCard
                userName={'nathanjhood'}
                linkTo={'https://github.com/nathanjhood/NonLinearFilters.git'}
                altString={'NonLinearFilters'}
                repoName={'NonLinearFilters'}
              />
            </div>

            <MDXRemote source={mdx ? mdx : '# 404: not found'} />

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
