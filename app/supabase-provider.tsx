'use client'

import type { Database } from '@/types_db'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [supabase] = useState(() => createPagesBrowserClient())
  const router = useRouter()

  // useEffect(() => {
  //   const getSupabase = async () => {

  //     const { data: { subscription } } = await supabase.auth.onAuthStateChange((event) => {
  //     if (event === 'SIGNED_IN')
  //       router.refresh()
  //     })

  //     return () => {
  //       subscription.unsubscribe()
  //     }
  //   }

  //   getSupabase()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }

  }, [router, supabase])

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }

  return context
}

// 'use client'

// import { createContext, useContext, useEffect, useState } from 'react'
// import { Session, SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { useRouter } from 'next/navigation'
// import { Database } from '@/types_db'

// type MaybeSession = Session | null

// type SupabaseContext = {
//   supabase: SupabaseClient<any, string>
//   session: MaybeSession
// }

// const Context = createContext<SupabaseContext | undefined>(undefined)

// export default function SupabaseProvider({
//   children,
//   session,
// }: {
//   children: React.ReactNode
//   session: MaybeSession
// }) {
//   const supabase = createClientComponentClient<Database>()
//   const router = useRouter()

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_, _session) => {
//       if (_session?.access_token !== session?.access_token) {
//         router.refresh()
//       }
//     })

//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [router, supabase, session])

//   return (
//     <Context.Provider value={{ supabase, session }}>
//       <>{children}</>
//     </Context.Provider>
//   )
// }

// export const useSupabase = <
//   Database = any,
//   SchemaName extends string & keyof Database = 'public' extends keyof Database
//     ? 'public'
//     : string & keyof Database
// >() => {
//   let context = useContext(Context)

//   if (context === undefined) {
//     throw new Error('useSupabase must be used inside SupabaseProvider')
//   }

//   return context.supabase as SupabaseClient<Database, SchemaName>
// }

// export const useSession = () => {
//   let context = useContext(Context)

//   if (context === undefined) {
//     throw new Error('useSession must be used inside SupabaseProvider')
//   }

//   return context.session
// }
