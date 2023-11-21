'use server'
import 'server-only'

export default async function Main({ 
  children 
}: { 
  children: React.ReactNode 
}): Promise<JSX.Element> {

  return (
    <main>
      {children}
    </main>
  )
}
