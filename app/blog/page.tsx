// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createSupabaseServerSideClient } from '@/utils/supabase/ssr'
import { cookies } from 'next/headers'
import RealtimePosts from '@/components/blog/rtlist'
import NewPost from '@/components/blog/newpost'

import type { Database } from '@/types_db'

export default async function ServerComponent() {
  const cookieStore = cookies()

  const supabase = createSupabaseServerSideClient(cookieStore)


  const { data } = await supabase.from('posts').select('*')

  return (
    <>
      <NewPost />
      <RealtimePosts serverPosts={data ?? []} />
    </>
  )
}
