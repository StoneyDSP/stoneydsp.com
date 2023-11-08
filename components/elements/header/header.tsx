import { Nav } from '@/components/elements'

export default function Header({ title }: {
  title: string
}): JSX.Element {

  return (
    <header>
      <Nav />
      {/* <h2>
        {title ? title : 'Default title'}
      </h2> */}
    </header>
  )
}
