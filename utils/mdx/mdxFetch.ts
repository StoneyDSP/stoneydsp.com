'use server'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function mdxFetch(url: string) {
  try {
    // MDX text - can be from a local file, database, CMS, fetch, anywhere...
    const res = await fetch(url)
    const markdown = await res.text()
    try {
      const mdxParsed = await MDXRemote({source: markdown})
      return mdxParsed.props
    } catch (error) {
      console.log(`Failed to parse content ${url}:`, error)
      const mdxParseFailed = `# 404: Failed to parse due to ${error}`
      return mdxParseFailed
    }
  } catch (error) {
    // TypeError: Failed to fetch
    console.log(`Failed to fetch content ${url}:`, error)
    const markdownFetchFailed = `# 404: not found due to ${error}`
    return markdownFetchFailed
  }
}
