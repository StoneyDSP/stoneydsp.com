import type { VercelRequest, VercelResponse, VercelApiHandler } from '@vercel/node';
import * as Headers from '../../../_shared/headers';
import * as Methods from '../../../_shared/methods';
import * as Statuses from '../../../_shared/statuses';

// https://supabase.com/docs/reference/javascript/installing
import { createClient } from '@supabase/supabase-js'
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
  ) {

  response.setHeader('Content-Type', 'image/png');

  var public_anon_key: string | undefined;

  if(process.env.SUPABASE_ANON_KEY === undefined) {
    public_anon_key = "undefined";
  } else {
    public_anon_key = process.env.SUPABASE_ANON_KEY;
  };

  var supabase_url: string | undefined;

  if(process.env.SUPABASE_URL === undefined) {
    supabase_url = "undefined";
  } else {
    supabase_url = process.env.SUPABASE_URL;
  };

  // Create a single supabase client for interacting with your database
  const supabase = createClient(supabase_url, public_anon_key)

  const { data, error } = await supabase.functions.invoke('og-image',
  {
    headers: {
      'Content-Type': 'image/png',
    },
    body: {
      name: 'Functions',
      foo: 'bar'
    },
    method: "POST",

  }
  );

  if (error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log('Function returned an error', errorMessage)
  } else if (error instanceof FunctionsRelayError) {
    console.log('Relay error:', error.message)
  } else if (error instanceof FunctionsFetchError) {
    console.log('Fetch error:', error.message)
  }

  return response.status(200).send(data);
};
