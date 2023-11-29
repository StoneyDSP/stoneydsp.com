import NavBadge from './badge'
import NavMenu from './menu'
import NavUser from './user'
import { Suspense } from 'react'


export default function Nav(){

  return (
    <nav className='tableRowEven'>
      <div className="w-full max-w-4xl flex justify-center gap-8 items-center p-3 text-sm text-foreground">

        <NavBadge />

        <NavMenu />

        <Suspense fallback={<p className='text-foreground text-sm'>Loading session...</p>}>
          <NavUser />
        </Suspense>

      </div>
    </nav>
  )
}
