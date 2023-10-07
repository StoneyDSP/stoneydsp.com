<<<<<<< HEAD
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { Readable } from 'node:stream'
=======
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Readable } from 'node:stream';
>>>>>>> 67be2d85a006d1e3a5ca3280d2e46a9f59d21b6a

export const config = {
  api: {
    bodyParser: false,
  },
<<<<<<< HEAD
}
=======
};
>>>>>>> 67be2d85a006d1e3a5ca3280d2e46a9f59d21b6a

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
<<<<<<< HEAD
}
=======
};
>>>>>>> 67be2d85a006d1e3a5ca3280d2e46a9f59d21b6a

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const rawBody = buf.toString('utf8')

    res.json({ rawBody })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 67be2d85a006d1e3a5ca3280d2e46a9f59d21b6a
