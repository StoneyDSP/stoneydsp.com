import { headers, cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import HRGradient from '@/components/layouts/HRGradient'
import { Title, Text } from '@/lib/Typography'
// import customStorageAdapter from '@/lib/supabase/storage'

export const dynamic = 'force-dynamic'

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {



  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      return redirect(`/account`)
    }

    return redirect(`/login?message=Could not authenticate user`)
  }

  const signInWithGithub = async () => {
    'use server'

    console.log('trying Github OAuth')

    // const origin = headers().get('origin')
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })

    if (!error) {
      return redirect(`/account`)
    }

    return redirect(`/login?message=${error.message}`)
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (!error) {
      return redirect('/login?message=Check email to continue sign in process')
    }

    return redirect(`/login?message=${error.message}`)
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">

      <HRGradient />

      <Title level={1} className='text-center drop-shadow ' tabIndex={0}>
        Welcome!
      </Title>

      <HRGradient />

      <div className='py-4'></div>

      {/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link> */}

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >

        <label className="text-foreground" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />

        <label className="text-foreground" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <HRGradient />

        <button className="
          transition-colors
          bg-green-600
          hover:bg-purple-500
          border
          border-foreground/20
          rounded-md
          px-4
          py-2
          mb-2
          drop-shadow
          hover:drop-shadow-none
          "
        >
          <span className='text-white mb-2 drop-shadow hover:drop-shadow-none'>
            Sign&nbsp;In
          </span>
        </button>

        <button
          formAction={signUp}
          className="
            transition-colors
            bg-green-600
            hover:bg-purple-500
            border
            border-foreground/20
            rounded-md
            px-4
            py-2
            mb-2
            drop-shadow
            hover:drop-shadow-none
            "
        >
          <span className='text-white mb-2 drop-shadow hover:drop-shadow-none'>
            Sign&nbsp;Up
          </span>

        </button>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}

      </form>

      <HRGradient />

      <div className='py-2'></div>

      {/* <HRGradient />

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signInWithGithub}
      >
        <button
          className="
          transition-colors
          bg-green-600
          hover:bg-purple-500
          border
          border-foreground/20
          rounded-md
          px-4
          py-2
          mb-2
          drop-shadow
          hover:drop-shadow-none
          "
        >
          <span className='text-white mb-2 drop-shadow hover:drop-shadow-none'>
            Sign&nbsp;In&nbsp;with&nbsp;GitHub
          </span>
        </button>
      </form> */}

      <HRGradient />

      {/* <div
        id="g_id_onload"
        data-client_id="<client ID>"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        // class="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div> */}

    </div>
  )
}
