import NavBadge from './badge'
import NavMenu from './menu'
import NavUser from './user'
import LoadingSpinner from '@/components/layouts/Spinner'
import { Suspense } from 'react'


export default function Nav(){

  return (
    <nav className='tableRowEven'>
      <div className="w-full max-w-4xl flex justify-center gap-8 items-center p-3 text-sm text-foreground">

        <NavBadge />

        <NavMenu />

        <Suspense fallback={<LoadingSpinner />}>
          <NavUser />
        </Suspense>

      </div>
    </nav>
  )
}
