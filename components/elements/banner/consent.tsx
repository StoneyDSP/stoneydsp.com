'use client'
import { Ribbon } from '@/components/layouts'
import { Analytics } from '@vercel/analytics/react'
import { track } from '@vercel/analytics'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ConsentBanner() {

  const [showConsentBanner, setShowConsentBanner] = useState(false)

  useEffect(() => {
    if (!(sessionStorage.getItem('vercel-analytics'))) {
      /* || (localStorage.getItem('vercel-analytics') == 'true') */
      setShowConsentBanner(true);
    }
  }, []);

  if (!showConsentBanner) {
    return null
  }

  const acceptCookies = () => {
    sessionStorage.setItem('vercel-analytics', 'true')
    setShowConsentBanner(false);
  };

  const declineCookies = () => {
    // localStorage.setItem('vercel-analytics', 'false')
    sessionStorage.removeItem('vercel-analytics')
    setShowConsentBanner(false);
  };

  return (
    <div
      className='animate-in flex flex-col bottom-4 opacity-100 z-50 absolute justify-center gap-8 text-foreground text-center text-xs group rounded-lg border hover:border-foreground transition___shadow_off'
    >
      <Ribbon>
        <p
          className='text-foreground font-normal text-center text-xs p-4'
        >
          We use <a href='https://vercel.com/docs/analytics#how-visitors-are-determined' target='_blank' className='text-xs'>analytics</a> to understand how you use the site and help us improve it.
        </p>
        <div className="flex flex-col justify-center py-1">
          <p className="text-foreground text-center text-xs">
            <small>{' '}</small>
            <Link
              href="/terms-of-service"
              className="font-bold text-xs"
              target="_blank"
            >
              Terms of Service
            </Link>
            <span> || </span>
            <small>{' '}</small>
            <Link
              href="/privacy-policy"
              className="font-bold text-xs"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div
          className='flex flex-row justify-center gap-4 text-foreground text-center px-3 py-2'
        >
          <button
            type='button'
            // onClick={acceptCookies}
            onClick={() => {
              track('Accept Cookies');
              // ... other logic
              acceptCookies()
            }}
            className='py-2 px-3 flex rounded-md no-underline transition-colors bg-green-500 hover:bg-purple-300 border transition___shadow_off'
          >
            <span
              className='text-sm font-bold text-center text-foreground'
            >
              Accept
            </span>
          </button>
          <button
            type='button'
            // onClick={declineCookies}
            onClick={() => {
              track('Decline Cookies');
              // ... other logic
              declineCookies()
            }}
            className='py-2 px-3 flex rounded-md no-underline transition-colors bg-green-500 hover:bg-purple-300 border transition___shadow_off'
          >
            <span
              className='text-sm font-bold text-center text-foreground'
            >
              Decline
            </span>
          </button>
        </div>
        <Analytics
          beforeSend={(event) => {
            // if (localStorage.getItem('vercel-analytics') === 'false') {
            if (!(sessionStorage.getItem('vercel-analytics'))) {
              return null;
            } else {
              return event;
            }
          }}
        />
      </Ribbon>
    </div>
  )
}
