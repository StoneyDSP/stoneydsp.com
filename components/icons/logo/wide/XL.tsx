import Image from 'next/image'

export default async function LogoWideXL() {
  return (
    <picture className='relative'>
      <Image
        src={'/images/w_icon__1024x768.png'}
        width={1024}
        height={768}
        alt={"Copyright StoneyDSP 2023"}
        // className='hover:transition___glow_on'
      />
    </picture>
  )
}
