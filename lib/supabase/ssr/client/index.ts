import 'client-only'
import { Database } from '@/types/supabase'
import { createBrowserClient } from '@supabase/ssr'

const createSupabaseBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

export type SupabaseBrowserClient = ReturnType<typeof createSupabaseBrowserClient>
export default createSupabaseBrowserClient
