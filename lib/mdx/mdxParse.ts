'use server'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'

export default async function mdxParse(markdown: string) {
  const mdx: MDXRemoteProps["source"] = markdown
  try {
    await MDXRemote({source: mdx})
  } catch (error) {
    console.log(`Failed to parse content ${markdown}:`, error)
    const mdx: MDXRemoteProps = {source: `# 404: failed to render due to ${error}`}
    return mdx.source
  }
  return mdx
}
