import { createClient } from '@/utils/supabase/client'
import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'

export default async function UserButton() {

  const supabase = createClient()

  const { data: {user} } = await supabase.auth.getUser()

  return (
    <>
      {user ? (
        <div className="flex items-center gap-4">
          <Link href="/account" target="_self">Hey, {user.email}!{/**  ({session?.user.role})*/}</Link>
          <LogoutButton />
        </div>
        ) : (
        <Link
          href="/login"
          className="
          py-2
          px-3
          flex
          rounded-md
          no-underline
          transition-colors
          bg-green-500
          hover:bg-purple-400
          border-2
          hover:border-transparent
          "
        >
          <span className='font-bold text-center text-white'>
            Login
          </span>
        </Link>
      )}
    </>
  )
}
