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
import BlogArticle from '@/components/elements/article/blogArticle'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function CxxwinContent() {

  const mdx = await mdxFetch('https://raw.githubusercontent.com/nathanjhood/CxxWin/main/README.md')

  return (
    <BlogArticle>
      <div className={styles.container}>

        <article className={styles.content}>

          <div className={styles.flexboxgrid}>

            <div className="py-4"></div>

            <div className="grid grid-cols-1 gap-4">
              <GitProjectCard
                userName={'nathanjhood'}
                linkTo={'https://github.com/nathanjhood/CxxWin.git'}
                altString={'CxxWin'}
                repoName={'CxxWin'}
              />
            </div>

            <MDXRemote source={mdx ? mdx : '# 404: not found'} />

            <HRGradient />

            <BackToTop />

            <BackToHome />

            <HRGradient />

          </div>
        </article>
      </div>
    </BlogArticle>
  )
}
