import { revalidatePath } from 'next/cache'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'


export default async function NewPost(): Promise<JSX.Element> {

  const addPost = async (formData: FormData) => {
    'use server'
    const content = String(formData.get('content'))
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    await supabase.from('posts').insert({ content }).select()
    revalidatePath('/blog/')
  }

  return (
    <form action={addPost}>
      <input name="content" />
    </form>
  )
}
