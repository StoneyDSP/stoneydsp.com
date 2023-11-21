import styles from '@/app/template.module.css'

export default function Template({
  children
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className={styles.container}>

      <article className={styles.content}>

        <div className={styles.flexboxgrid}>

          {children}
        
        </div>

      </article>

    </div>
  )
}
