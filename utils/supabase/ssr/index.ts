import createSupabaseClientSideClient from '@/utils/supabase/ssr/client'
import createSupabaseMiddlewareClient from '@/utils/supabase/ssr/middleware'
import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'

import supportsLocalStorage from '@/utils/supabase/ssr/storage/support'
import customStorageAdapter from '@/utils/supabase/ssr/storage'

export {
  createSupabaseClientSideClient,
  createSupabaseMiddlewareClient,
  createSupabaseServerSideClient,

  supportsLocalStorage,
  customStorageAdapter
}
