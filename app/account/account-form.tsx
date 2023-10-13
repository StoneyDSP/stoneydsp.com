'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types_db'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import '@/app/globals.css'

// Import the new component
import Avatar from './avatar'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id as string)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      let { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    // <div className="form-widget">
    <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
      <div className="w-full flex flex-col items-center justify-center text-foreground">
        <Avatar
          uid={user?.id || 'undefined'}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ fullname, username, website, avatar_url: url })
          }}
        />
      </div>
      <div className="text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={session?.user.email} disabled
        />
      </div>
      <div>
        <label className="text-md" htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label className="text-md" htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="text-md" htmlFor="website-form">Website</label>
        <input
          name="website"
          id="website-form"
          type="url"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="block border primary border-gray-700 bg-green-700 rounded px-4 py-2 text-white mb-2"
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/sign-out" method="post">
          <button
            // className="button block border border-gray-700 rounded px-4 py-2 text-white mb-2"
            className="block border border-gray-700 bg-green-700 rounded px-4 py-2 text-white mb-2"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>

    </div>
  )
}
