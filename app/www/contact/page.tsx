import ContactContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import createSupabaseServerSideClient from '@/lib/supabase/ssr/server'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL('contact', getPublicSiteURL())
  }
}

export default async function ContactPage(): Promise<JSX.Element> {

  const cookieStore = cookies()
  const supabase = createSupabaseServerSideClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect(`/login?message=Could not authenticate user`)
  }

  return (
    <ContactContent />
  )
}
