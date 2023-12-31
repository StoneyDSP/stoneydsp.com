'use server'
import 'server-only'
import HRGradient from '@/components/layouts/HRGradient'
import BackToHome from '@/components/layouts/BackToHome'
import BackToTop from '@/components/layouts/BackToTop'
import { GitProjectCard } from '@/components/cards'
import MDXCache from '@/components/MDXCache'
// import BlogArticle from '@/components/elements/article/blogArticle'
import mdxFetch from '@/lib/mdx/mdxFetch'
// import styles from '@/app/template.module.css'

export default async function Base64Content() {

  const mdx = await mdxFetch('https://raw.githubusercontent.com/nathanjhood/base64/main/README.md')

  return (
    <>
    {/* <BlogArticle> */}
      {/* <div className={styles.container}>

        <article className={styles.content}>

          <div className={styles.flexboxgrid}> */}

            <div className="py-4"></div>

            <div className="grid grid-cols-1 gap-4">
              <GitProjectCard
                userName={'nathanjhood'}
                linkTo={'https://github.com/nathanjhood/base64.git'}
                altString={'base64'}
                repoName={'base64'}
              />
            </div>

            <MDXCache source={mdx ? mdx : '# 404: not found'} />

            <HRGradient />

            <BackToTop />

            <BackToHome />

            <HRGradient />

          {/* </div>
        </article>
      </div> */}
    {/* </BlogArticle> */}
    </>
  )
}
