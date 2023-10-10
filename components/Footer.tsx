import Link from 'next/link';
import '../app/globals.css'

export default async function Footer() {
  return (
    <div className="flex justify-center text-center text-xs">
      <p>
        Powered by{' '}
        <Link
          href="https://supabase.com/"
          target="_blank"
          className="font-bold"
        >
          Supabase
        </Link>
      </p>
    </div>
  )
}
