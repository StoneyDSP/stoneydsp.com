'use client'
import { createSupabaseClientSideClient } from '@/utils/supabase/ssr'
import { useEffect, useState } from 'react'
import type { Database } from '@/types_db'
import Link from 'next/link'

type Post = Database['public']['Tables']['posts']['Row']

export default function RealtimePosts({ serverPosts }: { serverPosts: Post[] }) {

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
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/blog/${post.id}`}>{post.content}</Link>
        </div>
      ))}
    </>
  )
}
