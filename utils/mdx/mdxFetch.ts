'use server'

export default async function mdxFetch(url: string) {

  try {
    // MDX text - can be from a local file, database, CMS, fetch, anywhere...
    const res = await fetch(url, { next: { tags: ['collection'] } })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const markdown = await res.text()
    console.log(`Successfully fetched content ${url}`)
    return markdown

  } catch (error) {

    // TypeError: Failed to fetch
    console.log(`Failed to fetch content ${url}:`, error)
    const markdown = `# 404: not found due to ${error}`
    return markdown
  }
}
