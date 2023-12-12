'use server'
import 'server-only'
import Image from 'next/image'
import logoWideXL from '@/public/images/w_icon__1024x768.png'
import { headers } from 'next/headers'

export default async function LogoWideXL() {
  const nonce = headers().get('X-Data-Nonce')
  const nonceUsed = nonce ? nonce : 'oopswheresmynonce'

  return (
    <picture className='animate-in flex items-center justify-center'>
      <Image
        src={logoWideXL.src}
        blurDataURL={logoWideXL.blurDataURL}
        width={1024}
        height={768}
        alt={"Copyright StoneyDSP 2023"}
        nonce={nonceUsed}
      />
    </picture>
  )
}
