import 'server-only'
import Link from 'next/link'

export default async function GitProjectCard({
  linkTo,
  userName,
  altString,
  repoName
}: {
  linkTo: string,
  userName: string,
  altString: string,
  repoName: string
}) {

  return (
    <Link
      href={linkTo}
      className="relative flex flex-col text-foreground tableRowOdd group rounded-lg border p-0 hover:border-foreground transition___shadow_off"
    >
      <picture>
        <source
          srcSet={`https://gh-readme-stats.stoneydsp.com/api/pin/?username=${userName}&repo=${repoName}&border_radius=0&hide_border=true&bg_color=00000000&theme=dark`}
          media="(prefers-color-scheme: dark)"
        />
        <source
          srcSet={`https://gh-readme-stats.stoneydsp.com/api/pin/?username=${userName}&repo=${repoName}&border_radius=0&hide_border=true&bg_color=00000000&theme=default`}
          media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
        />
        <img
          src={`https://gh-readme-stats.stoneydsp.com/api/pin/?username=${userName}&repo=${repoName}&border_radius=0&hide_border=true&bg_color=00000000`}
          alt={altString}
        />
      </picture>
    </Link>
  )
}
