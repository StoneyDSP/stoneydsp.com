'use server'
import 'server-only'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import {
    GitProjectCard
} from '@/components/cards'
import mdxFetch from '@/utils/mdx/mdxFetch'
import MDXCache from '@/components/MDXCache'
import BlogArticle from '@/components/elements/article/blogArticle'
import styles from '@/app/template.module.css'

export default async function BiquadsContent() {

  const mdx = await mdxFetch('https://raw.githubusercontent.com/nathanjhood/Biquads/main/README.md')

  return (
    <BlogArticle>
      <div className={styles.container}>

        <article className={styles.content}>

          <div className={styles.flexboxgrid}>

            <div className="py-4"></div>

            <div className="grid grid-cols-1 gap-4">
              <GitProjectCard
                userName={'nathanjhood'}
                linkTo={'https://github.com/nathanjhood/Biquads.git'}
                altString={'Biquads'}
                repoName={'Biquads'}
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
