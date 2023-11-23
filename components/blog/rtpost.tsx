'use client'
import 'client-only'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState, Suspense } from 'react'

import type { Database } from '@/types_db'

type Post = Database['public']['Tables']['posts']['Row']

export default function RealtimePost({ serverPost }: { serverPost: Post }): JSX.Element {

  // const supabase = createClientComponentClient<Database>()

  const createSupabaseClientSideClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const supabase = createSupabaseClientSideClient()
  const [post, setPost] = useState(serverPost)

  useEffect(() => {
    setPost(serverPost)
  }, [serverPost])

  useEffect(() => {
    const channel = supabase
      .channel('realtime post')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'posts',
          filter: `id=eq.${post.id}`,
        },
        (payload) => {
          setPost(payload.new as Post)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, post, setPost])

  return (
    <Suspense>
      <pre>
        {JSON.stringify(post, null, 2)}
      </pre>
    </Suspense>
  )
}
