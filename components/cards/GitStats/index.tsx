export default async function GitStatsCard() {

  return (
    <picture>
      <source
        srcSet="https://gh-readme-stats.stoneydsp.com/api?username=nathanjhood&show_icons=true&border_radius=0&hide_border=true&bg_color=00000000&theme=dark"
        media="(prefers-color-scheme: dark)"
      />
      <source
        srcSet="https://gh-readme-stats.stoneydsp.com/api?username=nathanjhood&show_icons=true&border_radius=0&hide_border=true&bg_color=00000000&theme=default"
        media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      />
      <img
        src="https://gh-readme-stats.stoneydsp.com/api?username=nathanjhood&show_icons=true&border_radius=0&hide_border=true&bg_color=00000000"
        alt="StoneyDSP's GitHub stats"
        // onBlur={
        //   () => {
        //     <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       width="467"
        //       height="195"
        //       fill="none"
        //       viewBox="0 0 467 195"
        //     >
        //       <rect
        //         width="467"
        //         height="195"
        //         fill="none"
        //         rx="60"
        //       />
        //     </svg>
        //   }
        // }
      />
    </picture>
  )
}
