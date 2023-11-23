'use client'
import 'client-only'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState, Suspense } from 'react'
import type { Database } from '@/types_db'
import Link from 'next/link'

type Post = Database['public']['Tables']['posts']['Row']

export default function RealtimePosts({ serverPosts }: { serverPosts: Post[] }): JSX.Element {

  const createSupabaseClientSideClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [posts, setPosts] = useState(serverPosts)
  const supabase = createSupabaseClientSideClient()

  useEffect(() => {
    setPosts(serverPosts)
  }, [serverPosts])

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload: { new: { content: string; created_at: string; id: number; user_id: string | null } }) =>
        setPosts((posts) => [...posts, payload.new as Post])
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setPosts, posts])

  return (
    <Suspense>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/blog/${post.id}`}>{post.content}</Link>
        </div>
      ))}
    </Suspense>
  )
}
