'use client'
import { Ribbon } from '@/components/layouts'
import { Analytics } from '@vercel/analytics/react'
import { track } from '@vercel/analytics'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ConsentBanner() {

  const [showConsentBanner, setShowConsentBanner] = useState(false)

  useEffect(() => {
    if (!(localStorage.getItem('vercel-analytics'))) {
      /* || (localStorage.getItem('vercel-analytics') == 'true') */
      setShowConsentBanner(true);
    }
  }, []);

  if (!showConsentBanner) {
    return null
  }

  const acceptCookies = () => {
    localStorage.setItem('vercel-analytics', 'true')
    setShowConsentBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('vercel-analytics', 'false')
    setShowConsentBanner(false);
  };

  return (
    <div
      className='flex flex-col justify-center gap-8 text-foreground text-center text-xs py-4'
    >
      <Ribbon>
        <p
          className='text-foreground font-normal text-center text-xs'
        >
          We use <a href='https://vercel.com/docs/analytics#how-visitors-are-determined' target='_blank'>analytics</a> to understand how you use the site and help us improve it.
        </p>
        <div className="flex flex-col justify-center py-1">
          <p className="text-foreground text-center text-xs">
            <small>{' '}</small>
            <Link
              href="/terms-of-service"
              className="font-bold"
              target="_blank"
            >
              Terms of Service
            </Link>
            <span> || </span>
            <small>{' '}</small>
            <Link
              href="/privacy-policy"
              className="font-bold"
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
            if (localStorage.getItem('vercel-analytics') === 'false') {
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
