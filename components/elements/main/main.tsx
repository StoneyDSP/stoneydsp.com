export default function Main({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}): JSX.Element {

  return (
    <main>
      {children}
    </main>
  )
}
