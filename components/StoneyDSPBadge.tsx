'use client'

import './badge.css'

import '../app/globals.css'

export default function BrandBadge() {
  return (
    <a
      className="py-2 px-3 flex rounded-md no-underline bg-black transition-colors hover:bg-gray-700 border"
      href="https://www.stoneydsp.com/"
      target="_blank"
      rel="noreferrer"
    >
      {/* <svg
        aria-label="StoneyDSP logomark"
        role="img"
        viewBox="0 0 74 64"
        className="h-4 w-4 mr-2 "
      >
        <path
          d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
          fill="currentColor"
        ></path>
      </svg> */}
      <h1 className="text-lg font-bold text-center">StoneyDSP</h1>
    </a>
  )
}
