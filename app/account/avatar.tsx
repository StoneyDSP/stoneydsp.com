'use client'
import 'client-only'
import { createBrowserClient } from "@supabase/ssr"
import { useState, useEffect } from "react"
import Image from 'next/image'
import { Database } from '@/app/types_db'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: Profiles['avatar_url']
  size: number
  onUpload: (url: string) => void
}) {

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label
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
          htmlFor="single"
        >
          <span className='text-lg font-semibold text-center text-white'>
            {uploading ? 'Uploading ...' : 'Upload'}
          </span>
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
