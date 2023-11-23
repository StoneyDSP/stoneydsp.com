import ProjectsContent from '@/components/articles/projects'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects'
  }
}

export default async function ProjectsPage(): Promise<JSX.Element> {
  return (
    <ProjectsContent />
  )
}
