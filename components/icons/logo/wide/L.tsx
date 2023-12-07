'use server'
import 'server-only'
import Image from 'next/image'
import logoWideL from '@/public/images/w_icon__768x512.png'
import { headers } from 'next/headers'

export default async function LogoWideL() {
  const nonce = headers().get('X-Nonce')
  const nonceUsed = nonce ? nonce : 'oopswheresmynonce'

  return (
    <picture className='animate-in flex items-center justify-center'>
      <Image
        src={logoWideL.src}
        blurDataURL={logoWideL.blurDataURL}
        width={768}
        height={512}
        alt={"Copyright StoneyDSP 2023"}
        nonce={nonceUsed}
      />
    </picture>
  )
}
