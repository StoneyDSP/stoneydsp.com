import HRGradient from '@/components/layouts/HRGradient'
import BackToHome from '@/components/layouts/BackToHome'
import BackToTop from '@/components/layouts/BackToTop'
import ContactForm from '@/components/elements/form/contact'
import { Title } from '@/lib/Typography'

export default async function ContactContent() {

  return (
    <>

      <HRGradient />

      <Title level={1} className='text-center' tabIndex={0}>
        Contact me.
      </Title>

      <HRGradient />

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
