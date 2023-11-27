'use client'
import 'client-only'
import { useState } from 'react'

export default function ButtonLike(): JSX.Element {
  const [likes, setLikes] = useState(0)

  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <div className='flex justify-center align-middle items-center z-50'>
      <button
        onClick={handleClick}
        className='absolute right-8 top-8 py-2 px-4 transition-colors bg-green-500 hover:bg-purple-400 border transition___shadow_off rounded-md text-white mb-2'
      >
        Like ({likes})
      </button>
    </div>
  )
}
