import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  BackToHome
} from '@/components/layouts'
import { Article } from '@/components/elements'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function BilineareqContent() {

  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const res = await fetch('https://raw.githubusercontent.com/nathanjhood/BiLinearEQ/main/README.md')
  const markdown = await res.text()

  return (
    <Article>
      <div className={styles.container}>

        <div className={styles.content}>

          <div className={styles.flexboxgrid}>

            <MDXRemote source={markdown} />

            <HRGradient />

            <BackToHome />

            <HRGradient />

          </div>
        </div>
      </div>
    </Article>
  )
}
