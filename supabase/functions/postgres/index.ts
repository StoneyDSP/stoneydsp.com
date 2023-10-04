import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors";

// Create a database pool with one connection.
const pool = new Pool(
  {
    tls: { enabled: false },
    database: 'postgres',
    hostname: Deno.env.get('DB_HOSTNAME'),
    user: 'postgres',
    port: 5432,
    password: Deno.env.get('DB_PASSWORD'),
  },
  1
);

console.log("Edge function 'postgres' up and running!");

serve(async (_req) => {
  try {
    // Grab a connection from the pool
    const connection = await pool.connect()

    try {
      // Run a query
      const result = await connection.queryObject`SELECT * FROM users`
      const users = result.rows // [{ id: 1, name: "Lionel Hutz" }, ...]

      // Encode the result as pretty printed JSON
      const body = JSON.stringify(
        users,
        (_key, value) => (typeof value === 'bigint' ? value.toString() : value),
        2
      )

      // Return the response with the correct content type header
      return new Response(body, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
    } finally {
      // Release the connection back into the pool
      connection.release()
    }
  } catch (err) {
    console.error(err)
    return new Response(String(err?.message ?? err), { status: 500 })
  }
});
