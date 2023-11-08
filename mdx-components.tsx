import type { MDXComponents } from 'mdx/types'

import '@/app/globals.css'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // pre: (({ children }) => <pre className='fragment'>
    //   {children}
    // </pre>),
    // code: (({ children }) => <code className='fragment'>
    //   {children}
    // </code>),
    ...components,
  }
}
