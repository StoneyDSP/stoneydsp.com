import HRGradient from '@/components/layouts/HRGradient'
import BackToHome from '@/components/layouts/BackToHome'
import BackToTop from '@/components/layouts/BackToTop'
import RepoCards from '@/components/cards/RepoCards'
import Link from 'next/link'

export default async function ProjectsContent() {

  return (
    <>

      <h2 className='animate-in text-center' tabIndex={0}>
        Welcome to my workbench.
      </h2>

      <p className='animate-in text-center italic' tabIndex={0}>
        Read about some of my most popular projects here...
      </p>

      <HRGradient />

      <RepoCards />

      <HRGradient />

      <p className='animate-in text-center italic' tabIndex={0}>
        ...and <Link href="/contact">let me know what you think</Link>!
      </p>

      <HRGradient />

      <BackToTop />

      <BackToHome />

      <HRGradient />

    </>
  )
}
