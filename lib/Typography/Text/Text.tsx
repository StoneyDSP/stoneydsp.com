// import { DetailedHTMLProps, type HTMLAttributes } from 'react'
'use client'
import 'client-only'
import classNames from 'classnames'
import React from 'react'

interface Props {
  children: React.ReactNode, // This tag must have child elements
  className?: string | undefined,
  style?: React.CSSProperties | undefined,
  tabIndex?: number | undefined,
  id?: string
}

const Text = ({ children, className, style, tabIndex, id }: Props) => (
  <p
    id={id}
    style={style ? style : undefined}
    tabIndex={tabIndex ? tabIndex : undefined}
    className={classNames(className)}
  >
    {children}
  </p>
)

export default Text
