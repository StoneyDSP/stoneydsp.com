'use client'
import 'client-only'
import { HRGradient } from '@/components/layouts'
import { Analytics } from '@vercel/analytics/react'
import { track } from '@vercel/analytics'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ConsentBanner() {

  const [showConsentBanner, setShowConsentBanner] = useState(false)

  useEffect(() => {
    if (!(sessionStorage.getItem('va-disable'))) {
      /* || (localStorage.getItem('va-disable') == 'true') */
      setShowConsentBanner(true);
    }
  }, []);

  if (!showConsentBanner) {
    return null
  }

  const acceptCookies = () => {
    sessionStorage.setItem('va-disable', 'false')
    setShowConsentBanner(false)
    track('Accepted Cookies')
  }

  const declineCookies = () => {
    sessionStorage.setItem('va-disable', 'true')
    // sessionStorage.removeItem('va-disable')
    setShowConsentBanner(false)
    track('Declined Cookies')
  }

  const closeBanner = () => {
    setShowConsentBanner(false)
    track('Ignored Cookies')
  }

  return (
    <div
      className='animate-in flex flex-col bottom-4 opacity-100 z-50 absolute justify-center text-foreground text-center bg-btn-background hover:bg-btn-background-hover text-xs group rounded-lg border hover:border-foreground transition___shadow_off'
    >
      {/* <Ribbon> */}
        <div className='z-60'>
          <button
            type='button'
            onClick={closeBanner}
            className='absolute right-0 py-1 px-1 flex no-underline z-70'
          >
            <span
              className='flex text-center text-foreground border hover:border-foreground rounded-md text-xs'
            >&nbsp;&nbsp;x&nbsp;&nbsp;</span>
          </button>
        </div>

        <HRGradient />

        <p
          className='text-foreground font-normal text-center text-xs rounded-lg px-2 pt-6 pb-1'
        >
          We use <a href='https://vercel.com/docs/analytics#how-visitors-are-determined' target='_blank' className='text-xs'>analytics</a> to understand how you use the site and help us improve it.
        </p>
        <div className="bg-background py-0">
          <HRGradient />
          <p className="text-foreground text-center text-xs">
            <small>{' '}</small>
            <Link
              href="/terms-of-service"
              className="font-bold text-xs z-70"
              target="_blank"
            >
              Terms of Service
            </Link>
          </p>
          <HRGradient />
          <p className="text-foreground text-center text-xs">
            <small>{' '}</small>
            <Link
              href="/privacy-policy"
              className="font-bold text-xs z-70"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </p>
          <HRGradient />
        </div>
        <div
          className='flex flex-row justify-center gap-4 text-foreground text-center px-3 pt-2 pb-4'
        >
          <button
            type='button'
            onClick={acceptCookies}
            className='py-2 px-3 flex rounded-md no-underline transition-colors bg-green-500 hover:bg-purple-400 border-2 z-70'
          >
            <span
              className='font-bold text-center text-white'
            >
              Accept
            </span>
          </button>
          <button
            type='button'
            onClick={declineCookies}
            className='py-2 px-3 flex rounded-md no-underline transition-colors bg-green-500 hover:bg-purple-400 border-2 z-70'
          >
            <span
              className='font-bold text-center text-white'
            >
              Decline
            </span>
          </button>
        </div>
        <Analytics
          beforeSend={(event) => {
            if (sessionStorage.getItem('va-disable') === 'false') {
            // if (!(sessionStorage.getItem('vercel-analytics'))) {
              return null;
            } else {
              return event;
            }
          }}
        />
      {/* </Ribbon> */}
    </div>
  )
}
