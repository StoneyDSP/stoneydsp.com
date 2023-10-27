export default async function Badge() {
  return (
    <a
      className="
        py-2
        px-3
        flex
        rounded-md
        no-underline
        transition-colors
        bg-green-500
        hover:bg-purple-300
        border
        transition___shadow_off
        "
      href="/"
      rel="noreferrer"
    >
      <h1 className="text-lg font-bold text-center text-foreground">
        StoneyDSP
      </h1>
    </a>
  )
}
