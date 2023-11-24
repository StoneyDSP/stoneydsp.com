import Link from 'next/link'

export default async function NotFound(): Promise<JSX.Element> {
  return (
    <div className='bg-background'>
      <h2 className='text-foreground'>Not Found</h2>
      <p className='text-foreground'>Could not find requested resource... Sorry about that!</p>
      <Link href="https://stoneydsp.com/" className='link text-foreground'>Return Home</Link>
    </div>
  )
}
