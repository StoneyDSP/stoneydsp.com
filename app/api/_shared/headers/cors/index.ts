/**
 * https://vercel.com/guides/how-to-enable-cors
*/
export const corsNext: HeadersInit = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    // another common pattern...
    // 'Access-Control-Allow-Origin': req.headers.origin,
}

/**
 * https://supabase.com/docs/guides/functions/cors
*/
export const corsSupabase: HeadersInit = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
