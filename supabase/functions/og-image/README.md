# og-image

Generate Open Graph images with Deno and Supabase Edge Functions. [View on GitHub](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/opengraph).

## Code

Create a `handler.tsx` file to construct the OG image in React:

```tsx handler.tsx
import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.4/mod.ts'

export default function handler(req: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 128,
          background: 'lavender',
        }}
      >
        Hello OG Image!
      </div>
    )
  )
}
```

Create an `index.ts` file to execute the handler on incoming requests:

```ts index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import handler from './handler.tsx'

console.log('Hello from og-image Function!')

serve(handler)
```