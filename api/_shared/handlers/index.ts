import type { VercelRequest, VercelResponse, VercelApiHandler } from '@vercel/node';
import * as Headers from '../headers';
import * as Methods from '../methods';
// import * as UserAgents from '../useragents';

import { getHandler } from './get';
import { headHandler } from './head';
import { optionsHandler } from './options';
import { postHandler } from './post';
import { putHandler } from './put';
import { deleteHandler } from './delete';
import { patchHandler } from './patch';
import { voidHandler } from './void';

export {
  getHandler,
  headHandler,
  optionsHandler,
  postHandler,
  putHandler,
  deleteHandler,
  patchHandler
};

export default voidHandler;
