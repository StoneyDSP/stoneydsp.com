import type { MDXComponents } from 'mdx/types'

import '@/app/globals.css'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (({ children }) => <h1>
      {children}
    </h1>),
    ...components,
  }
}
