'use server'
import 'server-only'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import { GitProjectCard } from '@/components/cards'
import MDXCache from '@/components/MDXCache'
import BlogArticle from '@/components/elements/article/blogArticle'
import mdxFetch from '@/utils/mdx/mdxFetch'
import styles from '@/app/template.module.css'

export default async function NonlinearfiltersContent() {

  const mdx = await mdxFetch('https://raw.githubusercontent.com/nathanjhood/NonLinearFilters/main/README.md')

  return (
    <BlogArticle>
      <div className={styles.container}>

        <article className={styles.content}>

          <div className={styles.flexboxgrid} id=''>

            <div className="py-4"></div>

            <div className="grid grid-cols-1 gap-4">
              <GitProjectCard
                userName={'nathanjhood'}
                linkTo={'https://github.com/nathanjhood/NonLinearFilters.git'}
                altString={'NonLinearFilters'}
                repoName={'NonLinearFilters'}
              />
            </div>

            <MDXCache source={mdx ? mdx : '# 404: not found'} />

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
