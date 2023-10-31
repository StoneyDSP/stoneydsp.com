import styles from './mdx.module.css'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

          <div>
            {children}
          </div>

        </div>
      </div>
    </div>
  )
}
