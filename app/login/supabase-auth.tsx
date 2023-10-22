'use client'
import { Auth } from '@supabase/auth-ui-react'
import { SocialLayout, ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { getURL } from '@/utils/helpers'
import type { Database } from '@/types_db'

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

  // const [theme, setTheme] = useState('dark')
  const [socialLayout, setSocialLayout] = useState<SocialLayout>(socialAlignments[1] satisfies SocialLayout)

  const [view, setView] = useState(views[0])
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      view={view.id}
      // appearance={{ theme: ThemeSupa }}
      appearance={{
        theme: ThemeSupa
        // style: {
          // button: { background: 'red', color: 'white' },
          // container: {}
          // anchor: { color: 'blue' },
          // divider: {},
          // label: {},
          // input: {},
          // loader: {},
          // message: {}
          //..
        // },
      }}
      theme="default"
      showLinks={true}
      providers={['github', 'discord', 'google']}
      socialLayout={socialLayout}
      redirectTo={`${getURL()}/auth/callback`}
    />
  )
}
