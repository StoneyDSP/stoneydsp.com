'use client'
import 'client-only'
import React from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  children: React.ReactNode, // This tag must have child elements
  className?: string | undefined,
  style?: React.CSSProperties | undefined,
  tabIndex?: number | undefined,
  id?: string,
  level?: number | undefined
}

export function Title(props: Props): React.JSX.Element {

  switch (props.level) {

  case 1:
    return (
      <h1 className={props.className ?? props.className} tabIndex={props.tabIndex ?? props.tabIndex}>
        {props.children}
      </h1>
    )

  case 2:
    return (
      <h2 className={props.className ?? props.className} tabIndex={props.tabIndex ?? props.tabIndex}>
        {props.children}
      </h2>
    )

  case 3:
    return (
      <h3 className={props.className ?? props.className} tabIndex={props.tabIndex ?? props.tabIndex}>
        {props.children}
      </h3>
    )

  case 4:
    return (
      <h4 className={props.className ?? props.className} tabIndex={props.tabIndex ?? props.tabIndex}>
        {props.children}
      </h4>
    )

  case 5:
    return (
      <h5 className={props.className ?? props.className} tabIndex={props.tabIndex ?? props.tabIndex}>
        {props.children}
      </h5>
    )

  case 6:
    return (
      <h6 className={props.className ?? props.className} tabIndex={props.tabIndex ?? props.tabIndex}>
        {props.children}
      </h6>
    )

  default:
    return (
      <h1 className={props.className ?? props.className} tabIndex={props.tabIndex ?? props.tabIndex}>
        {props.children}
      </h1>
    )
  }
}
