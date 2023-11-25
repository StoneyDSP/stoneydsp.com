import styles from '@/app/template.module.css'

export default function Template({
  children
}: {
  children: React.ReactNode
}): JSX.Element {

  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <section className={styles.flexboxgrid}>
          {children}
        </section>
      </article>
    </div>
  )
}
