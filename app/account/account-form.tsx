'use client'
import 'client-only'
import { useCallback, useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { type Session } from '@supabase/supabase-js'
// Import the new component
import Avatar from './avatar'

export default function AccountForm({ session }: { session: Session | null }) {

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
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

      const { error } = await supabase.from('profiles').upsert({
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
    <div className="form-widget">

      <Avatar
        uid={user?.id ? user.id : ''}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, website, avatar_url: url })
        }}
      />


      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className='
            transition-colors
            bg-supabutton
            hover:bg-supabutton-hover
            border
            border-foreground/20
            rounded-md
            px-4
            py-2
            mb-2
          '
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          <span className="text-lg font-semibold text-center text-white">{loading ? 'Loading ...' : 'Update'}</span>
        </button>
      </div>

      <div className='w-1/2'>
        <form action="/auth/signout" method="post">
          <button
            className='
              transition-colors
              bg-supabutton
              hover:bg-supabutton-hover
              border
              border-foreground/20
              rounded-md
              px-4
              py-2
              mb-2
            '
            type="submit"
          >
            <span className="text-lg font-semibold text-center text-white">Sign&nbsp;Out</span>
          </button>
        </form>
      </div>
    </div>
  )
}
