import { string } from "prop-types"


export default async function GitProjectCard({altString, repo}: {altString: string, repo: string}) {

  return (
    <picture>
      <source
        srcSet={`https://gh-readme-stats.stoneydsp.com/api/pin/?username=nathanjhood&repo=${repo}&border_radius=0&hide_border=true&bg_color=00000000&theme=dark`}
        media="(prefers-color-scheme: dark)"
      />
      <source
        srcSet={`https://gh-readme-stats.stoneydsp.com/api/pin/?username=nathanjhood&repo=${repo}&border_radius=0&hide_border=true&bg_color=00000000&theme=default`}
        media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      />
      <img
        src={`https://gh-readme-stats.stoneydsp.com/api/pin/?username=nathanjhood&repo=${repo}&border_radius=0&hide_border=true&bg_color=00000000`}
        alt={altString}
      />
    </picture>
  )
}
