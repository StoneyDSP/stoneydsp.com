import HRGradient from '@/components/layouts/HRGradient'
import BackToHome from '@/components/layouts/BackToHome'
import BackToTop from '@/components/layouts/BackToTop'
import RepoCards from '@/components/cards/RepoCards'

export default async function PorjectsContent() {

  return (
    <>

      <h2 className='text-center' tabIndex={0} id='Project__Title'>
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
