export default async function TextLargeBoldCenter({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <h2 className="text-lg font-bold text-center text-foreground">
      {children}
    </h2>
  )
}
