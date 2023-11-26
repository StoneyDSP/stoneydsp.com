import ContactContent from './content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { createSupabaseServerSideClient } from '@/utils/supabase/ssr/server'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// export const dynamic = 'force-dynamic'

export const title = 'Contact'
export const description = 'Systems, Web, Audio & Graphics'
export const canonical = new URL('contact', getPublicSiteURL())

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: canonical
  }
}

export default async function ContactPage(): Promise<JSX.Element> {

  const cookieStore = cookies()
  const supabase = createSupabaseServerSideClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <ContactContent />
  )
}
