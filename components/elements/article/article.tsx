'use client'
import {
  ButtonBack,
  ButtonLike
} from '@/components/elements'
import { useState } from "react"
import Link from "next/link"

export default function Article({
  children,
}: {
  children: React.ReactNode
}) {
  const [likes, setLikes] = useState(0)

  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <article className='animate-in'>

      <div
        className='animate-in flex flex-row gap-8'
      >
        <ButtonBack />
        <ButtonLike />
      </div>

      {children}

    </article>
  )
}
