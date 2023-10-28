import Link from 'next/link'

export default async function BackToHome() {
  return (
    <div className='flex flex-col '>
      <Link href="/" className="text-center">Back to home</Link>
    </div>
  )
}
