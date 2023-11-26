'use server'
import 'server-only'
import SocialIcons from '@/components/icons/social/IconSocial'
import Link from 'next/link'

export default async function Footer(): Promise<JSX.Element> {

  return (
    <footer className='footer'>

      <div className="py-4"></div>

      <div className="flex flex-row justify-center text-center text-xs py-2">
        <SocialIcons />
      </div>

      <div className="py-4"></div>

      <div className="flex justify-center text-center text-xs py-2">
        <p className="text-foreground">
          <small>{' '}</small>
          <Link
            href="/terms-of-service"
            className="font-bold"
          >
            Terms of Service
          </Link>
          <span> || </span>
          <small>{' '}</small>
          <Link
            href="/privacy-policy"
            className="font-bold"
          >
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* <div className="flex justify-center text-foreground text-center text-xs py-2">
        <p className="text-foreground bg-background">
          <small>{' '}</small>
          <Link
            href="/sitemap"
            className="font-bold"
          >
            <small>Sitemap</small>
          </Link>
        </p>
      </div> */}

      <div className="py-4"></div>

      <div className="flex justify-center text-center text-xs py-2">
        <p className="text-foreground">
          Created with{' '}
          <Link
            href="https://nextjs.org/"
            target="_blank"
            className="font-bold"
          >
            NextJs
          </Link>
        </p>
      </div>

      <div className="flex justify-center text-center text-xs py-2">
        <p className="text-foreground">
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

      <div className="flex justify-center text-center text-xs py-2">
        <p className="text-foreground">
          Deployed on{' '}
          <Link
            href="https://vercel.com/"
            target="_blank"
            className="font-bold"
          >
            Vercel
          </Link>
        </p>
      </div>

      <div className="py-4"></div>

      <div className="flex flex-row justify-center text-center text-xs py-2">
        <p className="text-foreground">
          Copyright &copy; <small>StoneyDSP 2023</small>.
        </p>
      </div>

      <div className="py-4"></div>

    </footer>
  )
}
