import Projects from '@/app/projects/projects'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projects',
}

export default async function ProjectsPage() {
  return (
    <Projects />
  )
}
