'use client'
import 'client-only'
import { Auth } from '@supabase/auth-ui-react'
import { SocialLayout, ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
// import { createBrowserClient } from '@supabase/ssr'
import { createSupabaseClientSideClient } from '@/utils/supabase/ssr/client'
import { useState } from 'react'
import { getPublicSiteURL } from '@/utils/headers/URL'

const views: { id: ViewType; title: string }[] = [
  { id: 'sign_in', title: 'Sign In' },
  { id: 'sign_up', title: 'Sign Up' },
  { id: 'magic_link', title: 'Magic Link' },
  { id: 'forgotten_password', title: 'Forgotten Password' },
  { id: 'update_password', title: 'Update Password' },
  { id: 'verify_otp', title: 'Verify Otp' },
]

const socialAlignments = ['horizontal', 'vertical'] as const

export default function AuthForm(): JSX.Element {

  // const createSupabaseClientSideClient = () =>
  // createBrowserClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // )

  const supabase = createSupabaseClientSideClient()

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
      showLinks={true}
      providers={['github', 'google']}
      socialLayout={socialLayout}
      redirectTo={`${publicSiteUrl}auth/callback`}
    />
  )
}
