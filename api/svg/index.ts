import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as Headers from '../_shared/headers';
import * as Methods from '../_shared/methods';
// import * as UserAgents from './_shared/useragents';

import { powered_by_vercel, powered_by_vercel_d } from './resources/powered-by-vercel';


export default async (req: VercelRequest, res: VercelResponse) => {

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');

  return res.status(200).send(
    powered_by_vercel
  );
};
