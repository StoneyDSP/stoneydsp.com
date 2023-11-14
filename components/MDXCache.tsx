import 'server-only'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import { HRGradient } from '@/components/layouts'

export default function MDXCache(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{
        ...(props.components || {}),
        img: ((props) => <img
            alt="Copyright StoneyDSP 2023"
            className='flex w-fit h-auto'
            {...props}
          />),
        h1: (({ children }) => <h1 tabIndex={0}>
          {children}
          <HRGradient />
        </h1>),
        h2: (({ children }) => <h2 tabIndex={0}>
          {children}
          <HRGradient />
        </h2>),
        h3: (({ children }) => <h3 tabIndex={0}>
          {children}
          <HRGradient />
        </h3>),
        h4: (({ children }) => <h4 tabIndex={0}>
          {children}
          <HRGradient />
        </h4>),
        h5: (({ children }) => <h5 tabIndex={0}>
          {children}
          <HRGradient />
        </h5>),
        h6: (({ children }) => <h6 tabIndex={0}>
          {children}
          <HRGradient />
        </h6>),
        p: (({ children }) => <p tabIndex={-1}>
          {children}
        </p>),
        pre: (({ children }) => <pre tabIndex={0} className="fragment">
          {children}
        </pre>),
        code: (({ children }) => <code tabIndex={-1}>
          {children}
        </code>),
      }}
    />
  )
}
