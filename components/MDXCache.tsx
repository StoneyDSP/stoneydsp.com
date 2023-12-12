import 'server-only'
// import Image from 'next/image'
// import { MDXComponents } from 'mdx/types'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import HRGradient from '@/components/layouts/HRGradient'

export default async function MDXCache(props: MDXRemoteProps) {
  'use server'

  return (
    <div className='max-w-screen-sm min-h-screen'>
    <MDXRemote
      {...props}
      components={{
        ...(props.components || {}),
        img: ((props) => <img
            alt="Copyright StoneyDSP 2023"
            className='flex max-w-md h-auto'
            // style={{ width: '100%', height: 'auto'}}
            {...props}
          />),
        h1: (({ children }) => (
          <div className='flex justify-center items-left'>
            <h1 tabIndex={0} className='opacity-90 text-4xl'>
              {children}
              <HRGradient />
            </h1>
          </div>
        )),
        h2: (({ children }) => (
          <div className='flex justify-left items-left'>
            <h2 tabIndex={0} className='text-left text-2xl opacity-90'>
              {children}
              <HRGradient />
            </h2>
          </div>
        )),
        h3: (({ children }) => (
          <div className='flex justify-center items-left'>
            <h3 tabIndex={0} className='text-base opacity-90'>
              {children}
              <HRGradient />
            </h3>
          </div>
        )),
        h4: (({ children }) => (
          <div className='flex justify-center items-left'>
            <h4 tabIndex={0} className='text-sm opacity-90'>
              {children}
              <HRGradient />
            </h4>
          </div>
        )),
        h5: (({ children }) => (
          <div className='flex justify-center items-left'>
            <h5 tabIndex={0} className='text-xs opacity-90'>
              {children}
              <HRGradient />
            </h5>
          </div>
        )),
        h6: (({ children }) => (
          <div className='flex justify-center items-left'>
            <h6 tabIndex={0} className='text-xxs opacity-90'>
              {children}
              <HRGradient />
            </h6>
          </div>
        )),
        p: (({ children }) => (
          <div className='flex justify-left items-left text-base'>
            <p tabIndex={-1} className='opacity-90'>
              {children}
            </p>
          </div>
        )),
        ul: (({ children }) => (
          <div className='flex justify-left items-left max-w-screen-md'>
            <ul tabIndex={-1} className='max-w-screen-sm list-disc'>
              {children}
            </ul>
          </div>
        )),
        ol: (({ children }) => (
          <div className='flex justify-left items-left max-w-screen-md'>
            <ol tabIndex={-1} className='max-w-screen-sm list-decimal'>
              {children}
            </ol>
          </div>
        )),
        li: (({ children }) => (
          <div className='flex justify-left items-left max-w-screen-md'>
            <li tabIndex={-1} className='max-w-screen-sm'>
              <span>{children}<br /></span><br />
            </li>
          </div>
        )),
        pre: (({ children }) => (
          <div className='justify-left items-left max-w-screen-md'>
            <pre tabIndex={0} className="fragment">
              {children}
            </pre>
          </div>
        )),
        code: (({ children }) => (
          <code tabIndex={-1}>
            {children}
          </code>
        )),
      }}
    />
    </div>
  )
}
