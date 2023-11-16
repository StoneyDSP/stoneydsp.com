import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import { ContactForm } from '@/components/elements'

export default async function ContactContent() {

  return (
    <>

      <h2 className='text-center' tabIndex={0}>
        Hi! I&#39;m Nathan, a.k.a StoneyDSP.
      </h2>

      <HRGradient />

      <ContactForm />

      <HRGradient />

      <HRGradient />

      <BackToTop />

      <BackToHome />

      <HRGradient />

    </>
  )
}
