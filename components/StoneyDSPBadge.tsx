import './badge.css'

// import '../app/globals.css'

export default async function BrandBadge() {
  return (
    <a
      className="py-2 px-3 flex rounded-md no-underline bg-black transition-colors hover:bg-gray-700 border"
      href="https://www.stoneydsp.com/"
      target="_blank"
      rel="noreferrer"
    >
      <h1 className="text-lg font-bold text-center">StoneyDSP</h1>
    </a>
  )
}
