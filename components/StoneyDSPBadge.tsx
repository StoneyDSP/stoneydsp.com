import '@/components/badge.module.css'

// import '../app/globals.css'

export default async function BrandBadge() {
  return (
    <a
      className="
        py-2
        px-3
        flex
        rounded-md
        no-underline
        transition-colors
        bg-purple-500
        hover:bg-purple-700
        border
        "
      href="https://www.stoneydsp.com/"
      target="_blank"
      rel="noreferrer"
    >
      <h1 className="text-lg font-bold text-center text-foreground">StoneyDSP</h1>
    </a>
  )
}
