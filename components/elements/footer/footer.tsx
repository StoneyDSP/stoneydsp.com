import SocialIcons from '@/components/icons/social/IconSocial'
import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {

  return (
    <footer className={styles.footer}>

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

      <div className="flex flex-row justify-center text-foreground text-center text-xs py-2">
        <p>
          Copyright <small>StoneyDSP 2023</small>.
        </p>
      </div>

    </footer>
  )
}
