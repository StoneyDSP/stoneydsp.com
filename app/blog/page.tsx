import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
import { cookies } from 'next/headers'
import RealtimePosts from '@/components/blog/rtlist'
import NewPost from '@/components/blog/newpost'
import '@/app/blog/page.module.css'

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
