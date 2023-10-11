'use client'
import { Auth } from '@supabase/auth-ui-react'
import { SocialLayout, ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { Database } from './database.types'

const views: { id: ViewType; title: string }[] = [
  { id: 'sign_in', title: 'Sign In' },
  { id: 'sign_up', title: 'Sign Up' },
  { id: 'magic_link', title: 'Magic Link' },
  { id: 'forgotten_password', title: 'Forgotten Password' },
  { id: 'update_password', title: 'Update Password' },
  { id: 'verify_otp', title: 'Verify Otp' },
]

const socialAlignments = ['horizontal', 'vertical'] as const

const publicSiteURL = process.env.NEXT_PUBLIC_SITE_URL?.concat('/auth/callback')

export default function AuthForm() {

  const [theme, setTheme] = useState('dark')
  const [socialLayout, setSocialLayout] = useState<SocialLayout>(socialAlignments[1] satisfies SocialLayout)

  const [view, setView] = useState(views[0])
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      view={view.id}
      appearance={{ theme: ThemeSupa }}
      theme={theme}
      showLinks={false}
      providers={['discord', 'github']}
      socialLayout={socialLayout}
      redirectTo={publicSiteURL}
    />
  )
}
