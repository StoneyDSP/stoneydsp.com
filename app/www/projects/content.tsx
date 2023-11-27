import HRGradient from '@/components/layouts/HRGradient'
import BackToHome from '@/components/layouts/BackToHome'
import BackToTop from '@/components/layouts/BackToTop'
import RepoCards from '@/components/cards/RepoCards'
import Link from 'next/link'
import { Title, Text } from '@/lib/Typography'

export default async function ProjectsContent() {

  return (
    <>

      <HRGradient />

      <Title level={1} className='text-center' tabIndex={0}>
        My projects.
      </Title>

      <HRGradient />

      <HRGradient />

      <Title level={2} className='text-center opacity-90 font-bold' /* tabIndex={0} */>
        &ldquo;Welcome to my workbench.
      </Title>

      <Text className='text-center opacity-90' /* tabIndex={0} */>
        Read about some of my most popular projects here...&rdquo;
      </Text>

      <HRGradient />

      <HRGradient />

      <RepoCards />

      <HRGradient />

      <HRGradient />

      <Text className='text-center opacity-90' /* tabIndex={0} */>
        &ldquo;...and <Link href="/contact">let me know what you think</Link>!&rdquo;
      </Text>

      <HRGradient />

      <HRGradient />

      <BackToTop />

      <BackToHome />

      <HRGradient />

    </>
  )
}
