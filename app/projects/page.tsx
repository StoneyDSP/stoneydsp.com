import ProjectsContent from '@/components/articles/projects'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL('projects', getPublicSiteURL())
  }
}

export default async function ProjectsPage(): Promise<JSX.Element> {
  return (
    <ProjectsContent />
  )
}
