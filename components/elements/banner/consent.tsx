'use client'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'

export default function ConsentBanner() {

  const [showConsentBanner, setShowConsentBanner] = useState(false)

  useEffect(() => {
    if (!(localStorage.getItem('va-disable') /* || (localStorage.getItem('va-disable') == 'true') */ )) {
      setShowConsentBanner(true);
    }
  }, []);

  if (!showConsentBanner) {
    return null
  }

  const acceptCookies = () => { 
    // posthog.opt_in_capturing();
    localStorage.removeItem('va-disable');
    setShowConsentBanner(false);
  };
  
  const declineCookies = () => {
    // posthog.opt_out_capturing();
    localStorage.setItem('va-disable', 'true')
    setShowConsentBanner(false);
  };

  return (
    <div>
      <p>
        We use tracking cookies to understand how you use 
        the product and help us improve it.
        Please accept cookies to help us improve.
      </p>
      <button 
        type="button"
        onClick={acceptCookies}
      >
        Accept cookies
      </button>
      <span> </span>
      <button 
        type="button"
        onClick={declineCookies}
      >
        Decline cookies
      </button>
      <Analytics
        beforeSend={(event) => {
          if (localStorage.getItem('va-disable')) {
            return null;
          }
          return event;
        }}
      />
    </div>
  )
}