'use client'
import 'client-only'
import { createSupabaseClientSideClient } from '@/utils/supabase/ssr'
import { useEffect, useState, Suspense } from 'react'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/types_db'

type Post = Database['public']['Tables']['posts']['Row']

export default function RealtimePost({ serverPost }: { serverPost: Post }) {

  // const supabase = createClientComponentClient<Database>()

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
