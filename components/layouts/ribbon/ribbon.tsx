import TextLargeBoldCenter from '@/components/layouts/TextLargeBoldCenter'
import HRGradient from '@/components/layouts/HRGradient'

// import styles from './ribbon.module.css'

export default async function Ribbon({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='tableRowOdd rounded-lg'>

      <HRGradient />

        <TextLargeBoldCenter>

          {children}

        </TextLargeBoldCenter>

      <HRGradient />

    </div>
  )
}
