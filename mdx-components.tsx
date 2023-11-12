import type { MDXComponents } from 'mdx/types'

import '@/app/globals.css'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (({ children }) => <h1 tabIndex={-1}>
      {children}
    </h1>),
    h2: (({ children }) => <h2 tabIndex={-1}>
      {children}
    </h2>),
    h3: (({ children }) => <h3 tabIndex={-1}>
      {children}
    </h3>),
    h4: (({ children }) => <h4 tabIndex={-1}>
      {children}
    </h4>),
    h5: (({ children }) => <h5 tabIndex={-1}>
      {children}
    </h5>),
    h6: (({ children }) => <h6 tabIndex={-1}>
      {children}
    </h6>),
    ...components,
  }
}
