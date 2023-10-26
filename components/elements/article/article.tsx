'use client'
import { useState } from "react"

import styles from './article.module.css'

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
    <article className={styles.article}>

      <div>
        {children}
      </div>

      <button onClick={handleClick}>
        Like ({likes})
      </button>

    </article>
  )
}
