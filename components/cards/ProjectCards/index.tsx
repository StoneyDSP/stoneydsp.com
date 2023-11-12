export default async function GitProjectCard({
  source,
  user,
  altString,
  repo
}: {
  source: string,
  user: string,
  altString: string,
  repo: string
}) {

  return (
    <a
      href={source}
      className="relative flex flex-col text-foreground tableRowOdd group rounded-lg border p-0 hover:border-foreground transition___shadow_off"
    >
      <picture>
        <source
          srcSet={`https://gh-readme-stats.stoneydsp.com/api/pin/?username=${user}&repo=${repo}&border_radius=0&hide_border=true&bg_color=00000000&theme=dark`}
          media="(prefers-color-scheme: dark)"
        />
        <source
          srcSet={`https://gh-readme-stats.stoneydsp.com/api/pin/?username=${user}&repo=${repo}&border_radius=0&hide_border=true&bg_color=00000000&theme=default`}
          media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
        />
        <img
          src={`https://gh-readme-stats.stoneydsp.com/api/pin/?username=${user}&repo=${repo}&border_radius=0&hide_border=true&bg_color=00000000`}
          alt={altString}
        />
      </picture>
    </a>
  )
}
