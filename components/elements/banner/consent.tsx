'use client'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'

export default function ConsentBanner() {

  const [showConsentBanner, setShowConsentBanner] = useState(false)

  useEffect(() => {
    if (!(localStorage.getItem('vercel-analytics'))) { /* || (localStorage.getItem('vercel-analytics') == 'true') */ 
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
      <p>
        We use tracking cookies to understand how you use 
        the product and help us improve it.
        Please accept cookies to help us improve
      </p>
      <div
        className='flex flex-row justify-center gap-4 text-foreground text-center'
      >      
        <button 
          type='button'
          onClick={acceptCookies}
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
          onClick={declineCookies}
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
    </div>
  )
}