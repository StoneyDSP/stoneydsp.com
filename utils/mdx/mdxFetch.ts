'use server'

export default async function mdxFetch(url: string) {
  try {
    // MDX text - can be from a local file, database, CMS, fetch, anywhere...
    const res = await fetch(url)
    const markdown = await res.text()
    return markdown
  } catch (error) {
    // TypeError: Failed to fetch
    console.log(`Failed to fetch content ${url}:`, error)
    const markdown = `# 404: not found due to ${error}`
    return markdown
  }
}
