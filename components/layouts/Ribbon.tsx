import TextLargeBoldCenter from './TextLargeBoldCenter'
import HRGradient from './HRGradient'

export default async function Ribbon({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="tableRowOdd gap-8">
      <HRGradient />
        <TextLargeBoldCenter>
          {children}
        </TextLargeBoldCenter>
      <HRGradient />
    </div>
  )
}
