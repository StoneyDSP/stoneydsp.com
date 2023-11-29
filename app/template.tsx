// import Main from '@/components/elements/main/main'
// import LoadingSpinner from '@/components/spinner/spinner'
// import { Suspense } from 'react'
import styles from '@/app/template.module.css'

export default async function Template({
  children
}: {
  children: React.ReactNode | Promise<React.ReactNode>
}) {

  console.log(` \u{25CB} Template() :: Returning new Template object... `)

  try {

    console.log(` \u{2713} Template() :: Returned Template object. `)

    return (

      <main>
        <div className={styles.container}>
          <article className={styles.content}>
            <section className={styles.flexboxgrid}>
              {children}
            </section>
          </article>
        </div>
      </main>

    )

  } catch(e) {

    const error: any = e
    console.log(` \u{2715} RootLayout() - :: Error returning new Template object: ${error}`)
    return Error(error)
  }


}
