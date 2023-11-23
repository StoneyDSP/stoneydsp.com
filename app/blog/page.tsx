import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
import { cookies } from 'next/headers'
import RealtimePosts from '@/components/blog/rtlist'
import NewPost from '@/components/blog/newpost'
import { Metadata } from 'next'
import '@/app/blog/page.module.css'

export const metadata: Metadata = {
  title: 'blog',
  description: 'Realtime-enabled blog posts from StoneyDSP.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/blog'
  }
}

export default async function BlogPage(): Promise<JSX.Element> {
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
