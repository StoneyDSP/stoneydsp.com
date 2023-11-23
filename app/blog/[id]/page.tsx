import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
import { notFound, redirect } from 'next/navigation'
import RealtimePost from '@/components/blog/rtpost'
import { cookies } from 'next/headers'

export default async function RTPost({ params: { id } }: { params: { id: string } }): Promise<JSX.Element> {

  const cookieStore = cookies()
  const supabase = createSupabaseServerSideClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/login')
  }

  const { data: post } = await supabase.from('posts').select().match({ id }).single()

  if (!post) {
    notFound()
  }

  return (
    <RealtimePost serverPost={post} />
  )
}
