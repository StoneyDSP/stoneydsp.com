'use client'
import 'client-only'
import Link  from 'next/link'
import Image from 'next/image'
import Favicon32 from './favicon-32x32.png'

export default function NavBadge(): JSX.Element {


  return (
    <div className='flex flex-row justify-items-center items-center gap-4'>
      <Link
        className="
          flex
          flex-row
          transition-colors
          bg-green-600
          hover:bg-purple-500
          border
          border-foreground/20
          rounded-md
          px-4
          py-2
          mb-2
          drop-shadow
          hover:drop-shadow-none
          hover:no-underline
          "
        href="/"
        rel="noreferrer"
      >
        {/* <Image src={Favicon32.src} alt='StoneyDSP' width={Favicon32.width} height={Favicon32.height}  /> */}
        <span className="text-white drop-shadow hover:drop-shadow-none">
          StoneyDSP
        </span>
      </Link>
    </div>
  )
}
