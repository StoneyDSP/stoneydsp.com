import HRGradient from '@/components/layouts/HRGradient'
import BackToHome from '@/components/layouts/BackToHome'
import BackToTop from '@/components/layouts/BackToTop'
import ContactForm from '@/components/elements/form/contact'

export default async function CorntactContent() {

  return (
    <main>

      <h2 className='text-center' tabIndex={0} id='Contact__Title'>
        Contact.
      </h2>

      <HRGradient />

      <ContactForm />

      <HRGradient />

      <HRGradient />

      <BackToTop />

      <BackToHome />

      <HRGradient />

    </main>
  )
}
