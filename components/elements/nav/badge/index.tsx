'use client'
import 'client-only'
import Link  from 'next/link'

export default function NavBadge() {
  return (
    <div className='flex flex-row justify-items-center items-center gap-4'>
      <Link
        className="
          transition-colors
          bg-supabutton
          hover:bg-supabutton-hover
          border
          border-foreground/20
          rounded-md
          px-4
          py-2
          mb-2
          "
        href="/"
        rel="noreferrer"
      >
        <span className="text-lg font-semibold text-center text-white">
          StoneyDSP
        </span>
      </Link>
    </div>
  )
}
