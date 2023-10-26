import styles from './main.module.css'

export default function Main({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <main className={styles.main}>

      {children}

    </main>
  )
}
