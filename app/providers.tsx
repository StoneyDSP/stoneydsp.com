'use client'

import { Auth, Typography, Button } from '@supabase/ui'
import { createBrowserClient } from '@supabase/ssr'
// import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { ModalProvider } from '@/components/modal/provider'
import { SupabaseClient } from '@supabase/supabase-js'

const { Text } = Typography

// Create a single supabase client for interacting with your database
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const Container = (props: any) => {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
        <Text>Signed in: {user.email}</Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  return props.children;
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
      {/* <SessionProvider> */}
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <Auth providers={['google', 'github']} supabaseClient={supabase}/>
      <ModalProvider>{children}</ModalProvider>
      {/* </SessionProvider> */}
      </Container>
    </Auth.UserContextProvider>
  )
}
