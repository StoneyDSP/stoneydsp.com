export default async function GitStatsTopLangsCard() {
  return (
    <picture>
      <source
        srcSet="https://gh-readme-stats.stoneydsp.com/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&hide=tex,css,html&border_radius=0&hide_border=true&bg_color=00000000&theme=dark"
        media="(prefers-color-scheme: dark)"
      />
      <source
        srcSet="https://gh-readme-stats.stoneydsp.com/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&hide=tex,css,html&border_radius=0&hide_border=true&bg_color=00000000&theme=default"
        media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      />
      <img
        src="https://gh-readme-stats.stoneydsp.com/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&hide=tex,css,html&border_radius=0&hide_border=true&bg_color=00000000"
        alt="StoneyDSP's Top Languages"
        onBlur={
          () => {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="405"
              fill="none"
              viewBox="0 0 300 405"
            >
              <rect
                width="300"
                height="405"
                fill="none"
                rx="60"
              />
            </svg>
          }
        }
      />
    </picture>
  )
}
