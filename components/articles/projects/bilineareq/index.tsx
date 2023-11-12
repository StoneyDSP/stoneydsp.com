import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import {
    GitProjectCard
} from '@/components/cards'
import mdxFetch from '@/utils/mdx/mdxFetch'
import { Article } from '@/components/elements'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function BilineareqContent() {

  const mdx = await mdxFetch('https://raw.githubusercontent.com/nathanjhood/BiLinearEQ/main/README.md')

  return (
    <Article>
      <div className={styles.container}>

        <div className={styles.content}>

          <div className={styles.flexboxgrid}>

            <HRGradient />

            <div className="grid grid-cols-1 gap-4">
              <GitProjectCard
                userName={'nathanjhood'}
                linkTo={'https://github.com/nathanjhood/BiLinearEQ.git'}
                altString={'BiLinearEQ'}
                repoName={'BiLinearEQ'}
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
