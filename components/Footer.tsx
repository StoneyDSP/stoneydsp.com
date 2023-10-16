import Link from 'next/link'
import HRGradient from './HRGradient'
import SocialIcons from './icons/social/IconSocial'

export default async function Footer() {
  return (
    <footer id="index__body__footer">
      <div className="flex justify-center text-foreground text-center text-xs">
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

      <div className="gap-14" />

      <div className="flex justify-center text-foreground text-center text-xs py-16">
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

      <div className="flex flex-row justify-center text-foreground text-center text-xs">

        <SocialIcons />

      </div>
    </footer>
  )
}
