'use client'
import 'client-only'
import { Auth } from '@supabase/auth-ui-react'
import { SocialLayout, ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
// import { createBrowserClient } from '@supabase/ssr'
import { createSupabaseClientSideClient } from '@/utils/supabase/ssr/client'
import { useState, Suspense } from 'react'

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
    <Suspense>
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
    </Suspense>
  )
}
