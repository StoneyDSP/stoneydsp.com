'use client'
import { useState } from 'react'

export default function ButtonLike() {
  const [likes, setLikes] = useState(0)

  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <div className='flex justify-center align-middle items-center'>
      <button
        onClick={handleClick}
        className='absolute right-8 top-8 py-2 px-4 transition-colors bg-green-700 hover:bg-purple-500 border transition___shadow_off rounded-md text-foreground mb-2'
      >
        Like ({likes})
      </button>
    </div>
  )
}
