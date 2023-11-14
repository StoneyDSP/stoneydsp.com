import Image from 'next/image'

export default async function LogoWideL() {
  return (
    <picture className='relative'>
      <Image
        src={'/images/w_icon__768x512.png'}
        width={768}
        height={512}
        alt={"Copyright StoneyDSP 2023"}
      />
    </picture>
  )
}
