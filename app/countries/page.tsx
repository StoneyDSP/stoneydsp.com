import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/types_db"
import '@/app/globals.css'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Countries',
}

export default async function Countries() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

  const { data: countries } = await supabase.from("countries").select()

  return (
    <ul className="my-auto text-foreground">
      {countries?.map((country) => (
        <li key={country.id}>{country.name}</li>
      ))}
    </ul>
  )
}
