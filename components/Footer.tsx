'use-client'
import Link from 'next/link'
import SocialIcons from './icons/social/IconSocial'

export default async function Footer() {
  return (
    <footer id="index__body__footer" className="py-2">
      <div className="flex justify-center text-foreground text-center text-xs py-2">
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

      <div className="flex justify-center text-foreground text-center text-xs py-2">
        <p>
          Deployed with{' '}
          <Link
            href="https://vercel.com/"
            target="_blank"
            className="font-bold"
          >
            Vercel
          </Link>
        </p>
      </div>

      <div className="flex flex-row justify-center text-foreground text-center text-xs py-2">

        <SocialIcons />

      </div>
    </footer>
  )
}
