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

export default async function UbentoContent() {

  const mdx = `
# UBento

Minimal, bento-box style Ubuntu-based WSL distro front-end, ideal for targeting Linux-style NodeJs and CMake development environments from Windows platforms.
`

  return (
    <BlogArticle>
      <div className={styles.container}>

        <article className={styles.content}>

          <div className={styles.flexboxgrid}>

            <div className="py-4"></div>

            <div className="grid grid-cols-1 gap-4">
              <GitProjectCard
                userName={'nathanjhood'}
                linkTo={'https://github.com/nathanjhood/UBento.git'}
                altString={'UBento'}
                repoName={'UBento'}
              />
            </div>

            <MDXRemote source={mdx} />

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
