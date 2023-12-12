'use client'
import { Auth } from '@supabase/auth-ui-react'
import { SocialLayout, ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { useState } from 'react'
import createSupabaseBrowserClient from '@/lib/supabase/ssr/client'

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

  const supabase = createSupabaseBrowserClient()

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
      socialLayout={socialLayout}
      providers={['github', 'google']}
      redirectTo="/auth/callback"
    />
  )
}
