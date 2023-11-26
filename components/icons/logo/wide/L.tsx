import Image from 'next/image'
import logoWideL from '@/public/images/w_icon__768x512.png'

export default async function LogoWideL() {
  return (
    <picture className='animate-in flex items-center justify-center'>
      <Image
        src={logoWideL}
        width={768}
        height={512}
        alt={"Copyright StoneyDSP 2023"}

      />
    </picture>
  )
}
