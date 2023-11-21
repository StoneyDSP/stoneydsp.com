import { ImageResponse } from 'next/og'
import Image from 'next/image'
import iconPng32 from '/images/favicon/favicon-32x32.png'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
        <Image 
            src={iconPng32}
            width={32}
            height={32}
            alt="StoneyDSP"
        />
      // ImageResponse JSX element
    //   <div
    //     style={{
    //       fontSize: 24,
    //       background: 'black',
    //       width: '100%',
    //       height: '100%',
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       color: 'white',
    //     }}
    //   >
    //     A
    //   </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
