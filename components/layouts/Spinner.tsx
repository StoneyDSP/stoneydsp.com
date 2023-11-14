import styles from '@/app/layout.module.css'

export default function SpinnerRoot() {
  return (
    <div className={styles.container}>

      <article className={styles.content}>

        <div className={styles.flexboxgrid}>

          <div className="py-4"></div>

          <h2 className="text-foreground text-center">Loading...</h2>
          {/* <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="py-2 px-3 justify-center w-fit rounded-md no-underline transition-colors bg-green-500 hover:bg-purple-400 border-2 hover:border-transparent">
            <span className="text-foreground">Try again</span>
          </button> */}

        </div>

      </article>

    </div>
  )
}
