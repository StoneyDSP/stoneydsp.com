import Nav from '../nav/nav'

import styles from './header.module.css'

export default function Header({ title }: {
  title: string;
}): JSX.Element {

  return (
    <header className={styles.header}>
      <Nav />
      <h1>
        Page: {title ? title : 'Default title'}
      </h1>
    </header>
  )
}
