import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import RepoCards from '@/components/cards/RepoCards'

export default async function ProjectsContent() {

  return (
    <>

      <h2 className='text-center' tabIndex={0}>
        Read about some of my most popular projects:
      </h2>

      <HRGradient />

      <RepoCards />

      <HRGradient />

      <BackToTop />

      <BackToHome />

      <HRGradient />

    </>
  )
}
