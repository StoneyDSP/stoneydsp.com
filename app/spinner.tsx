import { LogoWideL } from '@/components/icons/logo/wide'
import styles from './template.module.css'

export default function SpinnerRoot() {
  return (
    <div className={styles.container}>

      <article className={styles.content}>

        <div className={styles.flexboxgrid}>

          <div className="py-4"></div>

          <div className='animate-spin animate-spin-in'>
            <LogoWideL />
          </div>

          <h2 className="text-foreground text-center">Loading...</h2>

          <div className='flex flex-col items-center'>

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

        </div>

      </article>

    </div>
  )
}
