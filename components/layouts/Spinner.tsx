import styles from './Spinner.module.css'

export default function SpinnerRoot() {
  return (
    <div className={styles.container}>

      <article className={styles.content}>

        <div className={styles.flexboxgrid}>

          <div className="py-4"></div>

          <h2 className="text-foreground text-center">Loading...</h2>

          <div className={styles.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

        </div>

      </article>

    </div>
  )
}
