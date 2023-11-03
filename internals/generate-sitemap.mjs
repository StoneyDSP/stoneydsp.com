import { writeFileSync } from 'fs'
import { globby } from 'globby'
import prettier from 'prettier'

async function generate() {
	const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')

	const pages = await globby([
		'app/page.tsx',
		'app/**/page.tsx',
		'!app/_examples/**/page.tsx',
		'!app/_*/**/page.tsx'
	])

	const sitemap = `
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${pages
			.map((page) => {
				const path = page
				//   .replace('pages', '')
				//   .replace('data', '')
				//   .replace('.js', '')
				//   .replace('.mdx', '');
					.replace('app', '')
					.replace('.tsx', '')
					// .replace('/page', '');
				const route = path === '/page' ? '' : path;

				return `
					<url>
						<loc>${`https://www.stoneydsp.com${route}`}</loc>
					</url>`
						})
						.join('')}
				</urlset>
				`

	const formatted = await prettier.format(sitemap, {
		...prettierConfig,
		parser: 'html',
	})

  /**
   * generate sitemap router
   *
   * this points to www and docs sitemaps
   */
  const sitemapRouter = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://stoneydsp.com/www_sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://stoneydsp.com/sitemap.xml</loc>
  </sitemap>
</sitemapindex>
`

	/**
   	* write sitemaps
   	*/
  	// eslint-disable-next-line no-sync
  	writeFileSync('public/sitemap.xml', sitemapRouter)
  	// eslint-disable-next-line no-sync
  	writeFileSync('public/www_sitemap.xml', formatted)

}

generate();
