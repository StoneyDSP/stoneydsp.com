export async function GitStatsTopLangsCardBG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="467"
      height="195"
      fill="none"
      viewBox="0 0 467 195"
    >
      <rect
        width="467"
        height="195"
        fill="none"
        rx="60"
      />
    </svg>
  )
}

export default async function GitStatsTopLangsCard() {
  return (
    <picture>
      <source
        srcSet="https://gh-readme-stats.stoneydsp.com/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&hide=tex,css,html&border_radius=0&hide_border=true&bg_color=00000000&theme=dark"
        media="(prefers-color-scheme: dark), (prefers-color-scheme: no-preference)"
      />
      <source
        srcSet="https://gh-readme-stats.stoneydsp.com/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&hide=tex,css,html&border_radius=0&hide_border=true&bg_color=00000000&theme=default"
        media="(prefers-color-scheme: light)"
      />
      <img src="https://gh-readme-stats.stoneydsp.com/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&hide=tex,css,html&border_radius=0&hide_border=true&bg_color=00000000" alt="StoneyDSP's Top Languages" />
    </picture>
  )
}
