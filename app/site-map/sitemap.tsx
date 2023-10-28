import { globby } from 'globby'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
import Link from 'next/link'
import styles from './sitemap.module.css'

export const dynamic = 'force-dynamic'

async function getPagesForSiteMap() {
  const pages = await globby([
		'app/page.tsx',
		'app/**/page.tsx',
		'!app/_examples/**/page.tsx',
		'!app/_*/**/page.tsx'
	])

  { /* `https://www.stoneydsp.com${route}`}`}).join('') */}
  { /* sitemap?.map(({ id }) => ({
    url: `https://example.com/${id}`,
    lastModified: new Date(),
  })) ?? [] */}

  return pages
}

export default async function PrivacyPolicy() {

  const pages = await getPagesForSiteMap()

  pages?.forEach((element) => console.log(element))

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

          <HRGradient />

          <ul>
          <li>
              <Link href={pages[0]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}>
                {pages[0]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}
              </Link>
            </li>
            <li>
              <Link href={pages[1]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}>
                {pages[1]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}
              </Link>
            </li>
            <li>
              <Link href={pages[2]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}>
                {pages[2]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}
              </Link>
            </li>
            <li>
              <Link href={pages[3]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}>
                {pages[3]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}
              </Link>
            </li>
            <li>
              <Link href={pages[4]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}>
                {pages[4]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}
              </Link>
            </li>
            <li>
              <Link href={pages[5]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}>
                {pages[5]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}
              </Link>
            </li>
            <li>
              <Link href={pages[6]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}>
                {pages[6]
              .replace('app',  '')
              .replace('page', '')
              .replace('.tsx', '')}
              </Link>
            </li>
          </ul>

          <HRGradient />

          <BackToHome />

          <HRGradient />

        </div>
      </div>
    </div>
  )
}
