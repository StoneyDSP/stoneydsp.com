'use client'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'
import type { Database } from '@/types_db'
import Link from 'next/link'
import { Suspense } from 'react'

type Post = Database['public']['Tables']['posts']['Row']

export default function RealtimePosts({ serverPosts }: { serverPosts: Post[] }) {

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
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) =>
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
