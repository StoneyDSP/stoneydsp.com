// import { DetailedHTMLProps, type HTMLAttributes } from 'react'
'use client'
import 'client-only'
import React from 'react'

export function Text({
  children,
  className,
  style,
  tabIndex
}: {
  children: React.ReactNode, // This tag must have child elements
  className?: string | undefined,
  style?: React.CSSProperties | undefined,
  tabIndex?: number | undefined,
}): React.JSX.Element {
  return (
    <p
      className={className ? className : undefined}
      tabIndex={tabIndex ? tabIndex : undefined}
      style={style ? style : undefined}
    >
      {children}
    </p>
  )
}
