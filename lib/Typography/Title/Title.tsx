'use client'
import 'client-only'
import React from 'react'

export function Title(
  // props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> | undefined,
  {
    children,
    className,
    tabIndex,
    level
}: {
  children: React.ReactNode,
  className?: string | undefined,
  tabIndex?: number | undefined,
  level: number | undefined
}
): React.JSX.Element {

  switch (level) {

  case 1:
    return (
      <h1 className={className ?? className} tabIndex={tabIndex ?? tabIndex}>
        {children}
      </h1>
    )

  case 2:
    return (
      <h2 className={className ?? className} tabIndex={tabIndex ?? tabIndex}>
        {children}
      </h2>
    )

  case 3:
    return (
      <h3 className={className ?? className} tabIndex={tabIndex ?? tabIndex}>
        {children}
      </h3>
    )

  case 4:
    return (
      <h4 className={className ?? className} tabIndex={tabIndex ?? tabIndex}>
        {children}
      </h4>
    )

  case 5:
    return (
      <h5 className={className ?? className} tabIndex={tabIndex ?? tabIndex}>
        {children}
      </h5>
    )

  case 6:
    return (
      <h6 className={className ?? className} tabIndex={tabIndex ?? tabIndex}>
        {children}
      </h6>
    )

  default:
    return (
      <h1 className={className ?? className} tabIndex={tabIndex ?? tabIndex}>
        {children}
      </h1>
    )
  }
}
