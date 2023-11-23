'use client' // Error components must be Client Components
import 'client-only'
import { LogoWideL } from '@/components/icons/logo/wide'
import { useEffect } from 'react'
import styles from '@/app/template.module.css'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): JSX.Element {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className={styles.container}>

      <article className={styles.content}>

        <div className={styles.flexboxgrid}>

          <div className="py-4"></div>

          <LogoWideL />

          <h2 className="text-foreground">Something went wrong!</h2>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="py-2 px-3 justify-center w-fit rounded-md no-underline transition-colors bg-green-500 hover:bg-purple-400 border-2 hover:border-transparent">
            <span className="text-foreground">Try again</span>
          </button>

        </div>

      </article>

    </div>
  )
}
