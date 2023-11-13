'use server'
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

// export const dynamic = 'force-dynamic'

export default async function UbentoContent() {

  const mdx = await mdxFetch('https://raw.githubusercontent.com/nathanjhood/UBento/build/README.md')
// # UBento

// Minimal, bento-box style Ubuntu-based WSL distro front-end, ideal for targeting Linux-style NodeJs and CMake development environments from Windows platforms.
// `

  const components = {}

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

            <MDXRemote
              source={mdx ? mdx : '# 404: not found'}
              components={{
                ...components,
                h1: (({ children }) => <h1 tabIndex={0}>
                  {children}
                </h1>),
                h2: (({ children }) => <h2 tabIndex={0}>
                  {children}
                </h2>),
                h3: (({ children }) => <h3 tabIndex={0}>
                  {children}
                </h3>),
                h4: (({ children }) => <h4 tabIndex={0}>
                  {children}
                </h4>),
                h5: (({ children }) => <h5 tabIndex={0}>
                  {children}
                </h5>),
                h6: (({ children }) => <h6 tabIndex={0}>
                  {children}
                </h6>),
                p: (({ children }) => <p tabIndex={-1}>
                  {children}
                </p>),
                pre: (({ children }) => <pre tabIndex={0} className="fragment">
                  {children}
                </pre>),
                code: (({ children }) => <code tabIndex={-1}>
                  {children}
                </code>),
              }}
            />

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
