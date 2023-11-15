'use client'
import { Auth } from '@supabase/auth-ui-react'
import { SocialLayout, ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { createSupabaseClientSideClient } from '@/utils/supabase/ssr'
import { useState } from 'react'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { createClient } from '@/utils/supabase/client'
// import { Database } from '@/types_db'

const views: { id: ViewType; title: string }[] = [
  { id: 'sign_in', title: 'Sign In' },
  { id: 'sign_up', title: 'Sign Up' },
  { id: 'magic_link', title: 'Magic Link' },
  { id: 'forgotten_password', title: 'Forgotten Password' },
  { id: 'update_password', title: 'Update Password' },
  { id: 'verify_otp', title: 'Verify Otp' },
]

const socialAlignments = ['horizontal', 'vertical'] as const

export default function AuthForm() {

  // const supabase = createClientComponentClient<Database>()

  const supabase = createSupabaseClientSideClient()

  const getPublicSiteURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
  }

  const publicSiteUrl = getPublicSiteURL()

  const [theme, setTheme] = useState('prefers-color-scheme')
  const [socialLayout, setSocialLayout] = useState<SocialLayout>(socialAlignments[1] satisfies SocialLayout)
  const [view, setView] = useState(views[0])

  return (
    <Auth
      supabaseClient={supabase}
      view={view.id}
      appearance={{ theme: ThemeSupa }}
      theme={theme}
      showLinks={false}
      providers={['github', 'google']}
      socialLayout={socialLayout}
      redirectTo={publicSiteUrl?.concat('/auth/callback')}
    />
  )
}
