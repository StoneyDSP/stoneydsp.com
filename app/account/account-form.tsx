'use client'
import 'client-only'
import { useCallback, useEffect, useState, Suspense } from 'react'
import { User } from '@supabase/supabase-js'
import createSupabaseBrowserClient from '@/lib/supabase/ssr/client'

// Import the new component
import Avatar from './avatar'

export default function AccountForm() {

  const supabase = createSupabaseBrowserClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [user, setUser] = useState<User | undefined>(undefined)
  // const user = session?.user

  const getUser = useCallback(async () => {

    try {

      setLoading(true)
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        throw error
      }

      if (session) {
        setUser(session?.user)
      }

    } catch (error) {
      alert('Error loading getting user!')
    } finally {
      setLoading(false)
    }

  }, [supabase])

  useEffect(() => {
    getUser()
  }, [supabase, getUser])

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user!.id)
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
        <input id="email" type="text" value={user?.email} disabled />
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
          bg-green-600
          hover:bg-purple-400
          border
          border-foreground/20
          rounded-md
          px-4
          py-2
          mb-2
        '
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          // onChange={(e) => getSession()}
          disabled={loading}
        >
          <span className="text-lg font-semibold text-center text-white">
            {loading ? 'Loading ...' : 'Update'}
          </span>
        </button>
      </div>

      <div>
        <form action="/auth/v1/signout" method="post">
          <button
            className='
              transition-colors
              bg-green-600
              hover:bg-purple-400
              border
              border-foreground/20
              rounded-md
              px-4
              py-2
              mb-2
            '
            type="submit"
          >
            <span className="text-lg font-semibold text-center text-white">
              Sign&nbsp;Out
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}
