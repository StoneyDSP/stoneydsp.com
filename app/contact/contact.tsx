import HRGradient from '@/components/layouts/HRGradient'

import styles from './contact.module.css'

export const dynamic = 'force-dynamic'

export default async function Contact() {

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

        </div>

        <HRGradient />

      </div>

    </div>
  )
}
