import Link from 'next/link'
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export default async function NavUser(){

  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const session = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='flex flex-row justify-items-center items-center gap-4'>

      {user ? (
        <div className="flex items-center gap-4 text-center">
          <Link href="/account" target="_self">
            <span className="text-xs font-light text-center">
              {user.email}<br />
              ({user?.role})
            </span>
          </Link>
        </div>
        ) : (
        <span className="text-xs font-light text-center">
          Systems,&nbsp;Web, Audio&nbsp;&&nbsp;Graphics
        </span>
        )
      }

      {user ? (
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className='
              transition-colors
              bg-green-600
              hover:bg-purple-400
              border
              border-foreground/20
              rounded-md
              px-4
              py-2
              mb-2
            '
          >
            <span className='text-lg font-semibold text-center text-white'>
              Log&nbsp;Out
            </span>
          </button>
        </form>
      ) : (
        <Link
          href="/login"
          className="
            transition-colors
            bg-green-600
            hover:bg-purple-400
            border
            border-foreground/20
            rounded-md
            px-4
            py-2
            mb-2
          "
        >
          <span className='text-lg font-semibold text-center text-white'>
            Log&nbsp;In
          </span>
        </Link>
      )}
    </div>

  )
}
