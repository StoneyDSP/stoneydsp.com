'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@/utils/supabase/client'
// import { Database } from '@/types_db'

export default function AuthForm() {

  // const supabase = createClientComponentClient<Database>()

  const supabase = createClient()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={['github', 'google']}
      redirectTo="/auth/callback"
    />
  )
}
