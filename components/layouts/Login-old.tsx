import 'server-only'
import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
// import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
// import { Turnstile } from '@marsidev/react-turnstile'
// import { useState } from 'react'
// import { turnstileSiteKey } from '@/utils/captcha/turnstile'
// import styles from '@/app/layout.module.css'
// import { Suspense } from 'react'

import AuthForm from '@/components/layouts/AuthForm'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  // const sitekey = turnstileSiteKey()

  // const [captchaToken, setCaptchaToken] = useState<string>()

  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createSupabaseServerSideClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createSupabaseServerSideClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createSupabaseServerSideClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // captchaToken,
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  // return (
  //   <div className={styles.container}>

  //     <div className={styles.content}>

  //       <div className={styles.flexboxgrid}>

  //         {isSupabaseConnected &&
  //         <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
  //           <Link
  //             href="/"
  //             className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
  //           >
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="24"
  //               height="24"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="2"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
  //             >
  //               <polyline points="15 18 9 12 15 6" />
  //             </svg>{' '}
  //             Back
  //           </Link>

  //           <form
  //             className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
  //             action={signIn}
  //           >
  //             <label className="text-md" htmlFor="email">
  //               Email
  //             </label>
  //             <input
  //               className="rounded-md px-4 py-2 bg-inherit border mb-6"
  //               name="email"
  //               placeholder="you@example.com"
  //               required
  //             />
  //             <label className="text-md" htmlFor="password">
  //               Password
  //             </label>
  //             <input
  //               className="rounded-md px-4 py-2 bg-inherit border mb-6"
  //               type="password"
  //               name="password"
  //               placeholder="••••••••"
  //               required
  //             />
  //             <button className="bg-green-500 hover:bg-purple-500 rounded-lg px-4 py-2 text-foreground mb-2">
  //               Sign In
  //             </button>
  //             <button
  //               formAction={signUp}
  //               className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
  //             >
  //               Sign Up
  //             </button>
  //             {/* <Turnstile
  //               siteKey={`${sitekey}`}
  //               onSuccess={(token) => { setCaptchaToken(token) }}
  //             /> */}
  //             {searchParams?.message && (
  //               <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
  //                 {searchParams.message}
  //               </p>
  //             )}
  //           </form>
  //         </div>}
  //       </div>
  //     </div>
  //   </div>
  // )
  return (
    <AuthForm />
  )
}
