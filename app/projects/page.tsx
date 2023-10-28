import Projects from './projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
}
export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  return (
    <Projects />
  )
}
