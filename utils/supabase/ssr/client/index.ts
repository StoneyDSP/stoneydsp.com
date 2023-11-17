'use client'
import 'client-only'
import { createBrowserClient } from '@supabase/ssr'

const createSupabaseClientSideClient = () =>
createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default createSupabaseClientSideClient