import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
// import '@/app/globals.css'
import styles from '@/app/projects/msys2-toolchain/msys2-toolchain.module.css'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

          <div>
            {children}
          </div>

          <HRGradient />

          <BackToHome />

          <HRGradient />

        </div>
      </div>
    </div>
  )
}
