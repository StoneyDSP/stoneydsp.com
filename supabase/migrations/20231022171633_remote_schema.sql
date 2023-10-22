
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "foreign";

ALTER SCHEMA "foreign" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE SCHEMA IF NOT EXISTS "next_auth";

ALTER SCHEMA "next_auth" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "stripe";

ALTER SCHEMA "stripe" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "public";

CREATE TYPE "public"."continents" AS ENUM (
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'Oceania',
    'North America',
    'South America'
);

ALTER TYPE "public"."continents" OWNER TO "postgres";

CREATE TYPE "public"."pricing_plan_interval" AS ENUM (
    'day',
    'week',
    'month',
    'year'
);

ALTER TYPE "public"."pricing_plan_interval" OWNER TO "postgres";

CREATE TYPE "public"."pricing_type" AS ENUM (
    'one_time',
    'recurring'
);

ALTER TYPE "public"."pricing_type" OWNER TO "postgres";

CREATE TYPE "public"."subscription_status" AS ENUM (
    'trialing',
    'active',
    'canceled',
    'incomplete',
    'incomplete_expired',
    'past_due',
    'unpaid',
    'paused'
);

ALTER TYPE "public"."subscription_status" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "next_auth"."uid"() RETURNS "uuid"
    LANGUAGE "sql" STABLE
    AS $$
  select
    coalesce(
        nullif(current_setting('request.jwt.claim.sub', true), ''),
        (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
    )::uuid
$$;

ALTER FUNCTION "next_auth"."uid"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") RETURNS "record"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  select
      into status, content
           result.status, result.content
      from public.delete_storage_object('avatars', avatar_url) as result;
end;
$$;

ALTER FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."delete_old_avatar"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  status int;
  content text;
  avatar_name text;
begin
  if coalesce(old.avatar_url, '') <> ''
      and (tg_op = 'DELETE' or (old.avatar_url <> new.avatar_url)) then
    -- extract avatar name
    avatar_name := old.avatar_url;
    select
      into status, content
      result.status, result.content
      from public.delete_avatar(avatar_name) as result;
    if status <> 200 then
      raise warning 'Could not delete avatar: % %', status, content;
    end if;
  end if;
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

ALTER FUNCTION "public"."delete_old_avatar"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."delete_old_profile"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  delete from public.profiles where id = old.id;
  return old;
end;
$$;

ALTER FUNCTION "public"."delete_old_profile"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") RETURNS "record"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  project_url text := '<YOURPROJECTURL>';
  service_role_key text := '<YOURSERVICEROLEKEY>'; --  full access needed
  url text := project_url||'/storage/v1/object/'||bucket||'/'||object;
begin
  select
      into status, content
           result.status::int, result.content::text
      FROM extensions.http((
    'DELETE',
    url,
    ARRAY[extensions.http_header('authorization','Bearer '||service_role_key)],
    NULL,
    NULL)::extensions.http_request) as result;
end;
$$;

ALTER FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."user_agent"() RETURNS "text"
    LANGUAGE "sql"
    AS $$
  select nullif(current_setting('request.headers', true)::json->>'user-agent', '')::text;
$$;

ALTER FUNCTION "public"."user_agent"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "next_auth"."accounts" (
    "id" "uuid" NOT NULL,
    "type" "text" NOT NULL,
    "provider" "text" NOT NULL,
    "providerAccountId" "text" NOT NULL,
    "refresh_token" "text",
    "access_token" "text",
    "expires_at" bigint,
    "token_type" "text",
    "scope" "text",
    "id_token" "text",
    "session_state" "text",
    "oauth_token_secret" "text",
    "oauth_token" "text",
    "userId" "uuid"
);

ALTER TABLE "next_auth"."accounts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "next_auth"."sessions" (
    "id" "uuid" NOT NULL,
    "expires" timestamp with time zone NOT NULL,
    "sessionToken" "text" NOT NULL,
    "userId" "uuid"
);

ALTER TABLE "next_auth"."sessions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "next_auth"."users" (
    "id" "uuid" NOT NULL,
    "name" "text",
    "email" "text",
    "emailVerified" timestamp with time zone,
    "image" "text"
);

ALTER TABLE "next_auth"."users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "next_auth"."verification_tokens" (
    "identifier" "text",
    "token" "text" NOT NULL,
    "expires" timestamp with time zone NOT NULL
);

ALTER TABLE "next_auth"."verification_tokens" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."countries" (
    "id" bigint NOT NULL,
    "name" "text",
    "iso2" "text" NOT NULL,
    "iso3" "text",
    "local_name" "text",
    "continent" "public"."continents"
);

ALTER TABLE "public"."countries" OWNER TO "postgres";

ALTER TABLE "public"."countries" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."countries_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."customers" (
    "id" "uuid" NOT NULL,
    "stripe_customer_id" "text"
);

ALTER TABLE "public"."customers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."prices" (
    "id" "text" NOT NULL,
    "product_id" "text",
    "active" boolean,
    "description" "text",
    "unit_amount" bigint,
    "currency" "text",
    "type" "public"."pricing_type",
    "interval" "public"."pricing_plan_interval",
    "interval_count" integer,
    "trial_period_days" integer,
    "metadata" "jsonb",
    CONSTRAINT "prices_currency_check" CHECK (("char_length"("currency") = 3))
);

ALTER TABLE "public"."prices" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "text" NOT NULL,
    "active" boolean,
    "name" "text",
    "description" "text",
    "image" "text",
    "metadata" "jsonb"
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "website" "text",
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "status" "public"."subscription_status",
    "metadata" "jsonb",
    "price_id" "text",
    "quantity" integer,
    "cancel_at_period_end" boolean,
    "created" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "current_period_start" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "current_period_end" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "ended_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()),
    "cancel_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()),
    "canceled_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()),
    "trial_start" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()),
    "trial_end" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"())
);

ALTER TABLE "public"."subscriptions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."todos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "title" "text",
    "is_complete" boolean DEFAULT false,
    "user_id" "uuid" DEFAULT "auth"."uid"()
);

ALTER TABLE "public"."todos" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "full_name" "text",
    "avatar_url" "text",
    "billing_address" "jsonb",
    "payment_method" "jsonb"
);

ALTER TABLE "public"."users" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."accounts" (
    "id" "text",
    "business_type" "text",
    "country" "text",
    "email" "text",
    "type" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'accounts'
);

ALTER FOREIGN TABLE "stripe"."accounts" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."balance" (
    "balance_type" "text",
    "amount" bigint,
    "currency" "text",
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'balance'
);

ALTER FOREIGN TABLE "stripe"."balance" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."balance_transactions" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "description" "text",
    "fee" bigint,
    "net" bigint,
    "status" "text",
    "type" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'balance_transactions'
);

ALTER FOREIGN TABLE "stripe"."balance_transactions" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."charges" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "customer" "text",
    "description" "text",
    "invoice" "text",
    "payment_intent" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'charges'
);

ALTER FOREIGN TABLE "stripe"."charges" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."checkout_sessions" (
    "id" "text",
    "customer" "text",
    "payment_intent" "text",
    "subscription" "text",
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'checkout/sessions',
    "rowid_column" 'id'
);

ALTER FOREIGN TABLE "stripe"."checkout_sessions" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."customers" (
    "id" "text",
    "email" "text",
    "name" "text",
    "description" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'customers',
    "rowid_column" 'id'
);

ALTER FOREIGN TABLE "stripe"."customers" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."disputes" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "charge" "text",
    "payment_intent" "text",
    "reason" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'disputes'
);

ALTER FOREIGN TABLE "stripe"."disputes" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."events" (
    "id" "text",
    "type" "text",
    "api_version" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'events'
);

ALTER FOREIGN TABLE "stripe"."events" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."file_links" (
    "id" "text",
    "file" "text",
    "url" "text",
    "created" timestamp without time zone,
    "expired" boolean,
    "expires_at" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'file_links'
);

ALTER FOREIGN TABLE "stripe"."file_links" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."files" (
    "id" "text",
    "filename" "text",
    "purpose" "text",
    "title" "text",
    "size" bigint,
    "type" "text",
    "url" "text",
    "created" timestamp without time zone,
    "expires_at" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'files'
);

ALTER FOREIGN TABLE "stripe"."files" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."invoices" (
    "id" "text",
    "customer" "text",
    "subscription" "text",
    "status" "text",
    "total" bigint,
    "currency" "text",
    "period_start" timestamp without time zone,
    "period_end" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'invoices'
);

ALTER FOREIGN TABLE "stripe"."invoices" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."mandates" (
    "id" "text",
    "payment_method" "text",
    "status" "text",
    "type" "text",
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'mandates'
);

ALTER FOREIGN TABLE "stripe"."mandates" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."payment_intents" (
    "id" "text",
    "customer" "text",
    "amount" bigint,
    "currency" "text",
    "payment_method" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'payment_intents'
);

ALTER FOREIGN TABLE "stripe"."payment_intents" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."payouts" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "arrival_date" timestamp without time zone,
    "description" "text",
    "statement_descriptor" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'payouts'
);

ALTER FOREIGN TABLE "stripe"."payouts" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."prices" (
    "id" "text",
    "active" boolean,
    "currency" "text",
    "product" "text",
    "unit_amount" bigint,
    "type" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'prices'
);

ALTER FOREIGN TABLE "stripe"."prices" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."products" (
    "id" "text",
    "name" "text",
    "active" boolean,
    "default_price" "text",
    "description" "text",
    "created" timestamp without time zone,
    "updated" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'products',
    "rowid_column" 'id'
);

ALTER FOREIGN TABLE "stripe"."products" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."refunds" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "charge" "text",
    "payment_intent" "text",
    "reason" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'refunds'
);

ALTER FOREIGN TABLE "stripe"."refunds" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."setup_attempts" (
    "id" "text",
    "application" "text",
    "customer" "text",
    "on_behalf_of" "text",
    "payment_method" "text",
    "setup_intent" "text",
    "status" "text",
    "usage" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'setup_attempts'
);

ALTER FOREIGN TABLE "stripe"."setup_attempts" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."setup_intents" (
    "id" "text",
    "client_secret" "text",
    "customer" "text",
    "description" "text",
    "payment_method" "text",
    "status" "text",
    "usage" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'setup_intents'
);

ALTER FOREIGN TABLE "stripe"."setup_intents" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."subscriptions" (
    "id" "text",
    "customer" "text",
    "currency" "text",
    "current_period_start" timestamp without time zone,
    "current_period_end" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'subscriptions',
    "rowid_column" 'id'
);

ALTER FOREIGN TABLE "stripe"."subscriptions" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."tokens" (
    "id" "text",
    "customer" "text",
    "currency" "text",
    "current_period_start" timestamp without time zone,
    "current_period_end" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'tokens'
);

ALTER FOREIGN TABLE "stripe"."tokens" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."topups" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "description" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'topups'
);

ALTER FOREIGN TABLE "stripe"."topups" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."transfers" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "description" "text",
    "destination" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'transfers'
);

ALTER FOREIGN TABLE "stripe"."transfers" OWNER TO "postgres";

ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "next_auth"."users"
    ADD CONSTRAINT "email_unique" UNIQUE ("email");

ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "provider_unique" UNIQUE ("provider", "providerAccountId");

ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessiontoken_unique" UNIQUE ("sessionToken");

ALTER TABLE ONLY "next_auth"."verification_tokens"
    ADD CONSTRAINT "token_identifier_unique" UNIQUE ("token", "identifier");

ALTER TABLE ONLY "next_auth"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "next_auth"."verification_tokens"
    ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("token");

ALTER TABLE ONLY "public"."countries"
    ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."prices"
    ADD CONSTRAINT "prices_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."todos"
    ADD CONSTRAINT "todos_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE TRIGGER "before_profile_changes" BEFORE DELETE OR UPDATE OF "avatar_url" ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."delete_old_avatar"();

CREATE OR REPLACE TRIGGER "todos" AFTER INSERT OR DELETE OR UPDATE ON "public"."todos" FOR EACH ROW EXECUTE FUNCTION "supabase_functions"."http_request"('https://www.stoneydsp.com/api/webhooks/supabase/todos', 'POST', '{"Content-type":"application/json"}', '{}', '1000');

ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "accounts_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessions_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "next_auth"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."prices"
    ADD CONSTRAINT "prices_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "public"."prices"("id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."todos"
    ADD CONSTRAINT "todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE "next_auth"."users" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access." ON "public"."countries" FOR SELECT USING (true);

CREATE POLICY "Allow public read-only access." ON "public"."prices" FOR SELECT USING (true);

CREATE POLICY "Allow public read-only access." ON "public"."products" FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert their own todos" ON "public"."todos" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Authenticated users can select todos" ON "public"."todos" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Block anonymous users." ON "public"."profiles" TO "anon" USING (false);

CREATE POLICY "Block anonymous users." ON "public"."users" TO "anon" USING (false);

CREATE POLICY "Can delete own user data." ON "public"."users" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "Can only view own subs data." ON "public"."subscriptions" FOR SELECT USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Can update own user data." ON "public"."users" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "Can view own user data." ON "public"."users" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."countries" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."prices" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."todos" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "next_auth" TO "service_role";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."airtable_fdw_handler"() TO "postgres";
GRANT ALL ON FUNCTION "public"."airtable_fdw_handler"() TO "anon";
GRANT ALL ON FUNCTION "public"."airtable_fdw_handler"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."airtable_fdw_handler"() TO "service_role";

GRANT ALL ON FUNCTION "public"."airtable_fdw_meta"() TO "postgres";
GRANT ALL ON FUNCTION "public"."airtable_fdw_meta"() TO "anon";
GRANT ALL ON FUNCTION "public"."airtable_fdw_meta"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."airtable_fdw_meta"() TO "service_role";

GRANT ALL ON FUNCTION "public"."airtable_fdw_validator"("options" "text"[], "catalog" "oid") TO "postgres";
GRANT ALL ON FUNCTION "public"."airtable_fdw_validator"("options" "text"[], "catalog" "oid") TO "anon";
GRANT ALL ON FUNCTION "public"."airtable_fdw_validator"("options" "text"[], "catalog" "oid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."airtable_fdw_validator"("options" "text"[], "catalog" "oid") TO "service_role";

GRANT ALL ON FUNCTION "public"."big_query_fdw_handler"() TO "postgres";
GRANT ALL ON FUNCTION "public"."big_query_fdw_handler"() TO "anon";
GRANT ALL ON FUNCTION "public"."big_query_fdw_handler"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."big_query_fdw_handler"() TO "service_role";

GRANT ALL ON FUNCTION "public"."big_query_fdw_meta"() TO "postgres";
GRANT ALL ON FUNCTION "public"."big_query_fdw_meta"() TO "anon";
GRANT ALL ON FUNCTION "public"."big_query_fdw_meta"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."big_query_fdw_meta"() TO "service_role";

GRANT ALL ON FUNCTION "public"."big_query_fdw_validator"("options" "text"[], "catalog" "oid") TO "postgres";
GRANT ALL ON FUNCTION "public"."big_query_fdw_validator"("options" "text"[], "catalog" "oid") TO "anon";
GRANT ALL ON FUNCTION "public"."big_query_fdw_validator"("options" "text"[], "catalog" "oid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."big_query_fdw_validator"("options" "text"[], "catalog" "oid") TO "service_role";

GRANT ALL ON FUNCTION "public"."click_house_fdw_handler"() TO "postgres";
GRANT ALL ON FUNCTION "public"."click_house_fdw_handler"() TO "anon";
GRANT ALL ON FUNCTION "public"."click_house_fdw_handler"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."click_house_fdw_handler"() TO "service_role";

GRANT ALL ON FUNCTION "public"."click_house_fdw_meta"() TO "postgres";
GRANT ALL ON FUNCTION "public"."click_house_fdw_meta"() TO "anon";
GRANT ALL ON FUNCTION "public"."click_house_fdw_meta"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."click_house_fdw_meta"() TO "service_role";

GRANT ALL ON FUNCTION "public"."click_house_fdw_validator"("options" "text"[], "catalog" "oid") TO "postgres";
GRANT ALL ON FUNCTION "public"."click_house_fdw_validator"("options" "text"[], "catalog" "oid") TO "anon";
GRANT ALL ON FUNCTION "public"."click_house_fdw_validator"("options" "text"[], "catalog" "oid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."click_house_fdw_validator"("options" "text"[], "catalog" "oid") TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_avatar"("avatar_url" "text", OUT "status" integer, OUT "content" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_old_avatar"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_old_avatar"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_old_avatar"() TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_old_profile"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_old_profile"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_old_profile"() TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_storage_object"("bucket" "text", "object" "text", OUT "status" integer, OUT "content" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."firebase_fdw_handler"() TO "postgres";
GRANT ALL ON FUNCTION "public"."firebase_fdw_handler"() TO "anon";
GRANT ALL ON FUNCTION "public"."firebase_fdw_handler"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."firebase_fdw_handler"() TO "service_role";

GRANT ALL ON FUNCTION "public"."firebase_fdw_meta"() TO "postgres";
GRANT ALL ON FUNCTION "public"."firebase_fdw_meta"() TO "anon";
GRANT ALL ON FUNCTION "public"."firebase_fdw_meta"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."firebase_fdw_meta"() TO "service_role";

GRANT ALL ON FUNCTION "public"."firebase_fdw_validator"("options" "text"[], "catalog" "oid") TO "postgres";
GRANT ALL ON FUNCTION "public"."firebase_fdw_validator"("options" "text"[], "catalog" "oid") TO "anon";
GRANT ALL ON FUNCTION "public"."firebase_fdw_validator"("options" "text"[], "catalog" "oid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."firebase_fdw_validator"("options" "text"[], "catalog" "oid") TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."logflare_fdw_handler"() TO "postgres";
GRANT ALL ON FUNCTION "public"."logflare_fdw_handler"() TO "anon";
GRANT ALL ON FUNCTION "public"."logflare_fdw_handler"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."logflare_fdw_handler"() TO "service_role";

GRANT ALL ON FUNCTION "public"."logflare_fdw_meta"() TO "postgres";
GRANT ALL ON FUNCTION "public"."logflare_fdw_meta"() TO "anon";
GRANT ALL ON FUNCTION "public"."logflare_fdw_meta"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."logflare_fdw_meta"() TO "service_role";

GRANT ALL ON FUNCTION "public"."logflare_fdw_validator"("options" "text"[], "catalog" "oid") TO "postgres";
GRANT ALL ON FUNCTION "public"."logflare_fdw_validator"("options" "text"[], "catalog" "oid") TO "anon";
GRANT ALL ON FUNCTION "public"."logflare_fdw_validator"("options" "text"[], "catalog" "oid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."logflare_fdw_validator"("options" "text"[], "catalog" "oid") TO "service_role";

GRANT ALL ON FUNCTION "public"."s3_fdw_handler"() TO "postgres";
GRANT ALL ON FUNCTION "public"."s3_fdw_handler"() TO "anon";
GRANT ALL ON FUNCTION "public"."s3_fdw_handler"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."s3_fdw_handler"() TO "service_role";

GRANT ALL ON FUNCTION "public"."s3_fdw_meta"() TO "postgres";
GRANT ALL ON FUNCTION "public"."s3_fdw_meta"() TO "anon";
GRANT ALL ON FUNCTION "public"."s3_fdw_meta"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."s3_fdw_meta"() TO "service_role";

GRANT ALL ON FUNCTION "public"."s3_fdw_validator"("options" "text"[], "catalog" "oid") TO "postgres";
GRANT ALL ON FUNCTION "public"."s3_fdw_validator"("options" "text"[], "catalog" "oid") TO "anon";
GRANT ALL ON FUNCTION "public"."s3_fdw_validator"("options" "text"[], "catalog" "oid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."s3_fdw_validator"("options" "text"[], "catalog" "oid") TO "service_role";

GRANT ALL ON FUNCTION "public"."stripe_fdw_handler"() TO "postgres";
GRANT ALL ON FUNCTION "public"."stripe_fdw_handler"() TO "anon";
GRANT ALL ON FUNCTION "public"."stripe_fdw_handler"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."stripe_fdw_handler"() TO "service_role";

GRANT ALL ON FUNCTION "public"."stripe_fdw_meta"() TO "postgres";
GRANT ALL ON FUNCTION "public"."stripe_fdw_meta"() TO "anon";
GRANT ALL ON FUNCTION "public"."stripe_fdw_meta"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."stripe_fdw_meta"() TO "service_role";

GRANT ALL ON FUNCTION "public"."stripe_fdw_validator"("options" "text"[], "catalog" "oid") TO "postgres";
GRANT ALL ON FUNCTION "public"."stripe_fdw_validator"("options" "text"[], "catalog" "oid") TO "anon";
GRANT ALL ON FUNCTION "public"."stripe_fdw_validator"("options" "text"[], "catalog" "oid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."stripe_fdw_validator"("options" "text"[], "catalog" "oid") TO "service_role";

GRANT ALL ON FUNCTION "public"."user_agent"() TO "anon";
GRANT ALL ON FUNCTION "public"."user_agent"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."user_agent"() TO "service_role";

GRANT ALL ON TABLE "next_auth"."accounts" TO "service_role";

GRANT ALL ON TABLE "next_auth"."sessions" TO "service_role";

GRANT ALL ON TABLE "next_auth"."users" TO "service_role";

GRANT ALL ON TABLE "next_auth"."verification_tokens" TO "service_role";

GRANT ALL ON TABLE "public"."countries" TO "anon";
GRANT ALL ON TABLE "public"."countries" TO "authenticated";
GRANT ALL ON TABLE "public"."countries" TO "service_role";

GRANT ALL ON SEQUENCE "public"."countries_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."countries_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."countries_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";

GRANT ALL ON TABLE "public"."prices" TO "anon";
GRANT ALL ON TABLE "public"."prices" TO "authenticated";
GRANT ALL ON TABLE "public"."prices" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";

GRANT ALL ON TABLE "public"."todos" TO "anon";
GRANT ALL ON TABLE "public"."todos" TO "authenticated";
GRANT ALL ON TABLE "public"."todos" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON TABLE "public"."wrappers_fdw_stats" TO "postgres";
GRANT ALL ON TABLE "public"."wrappers_fdw_stats" TO "anon";
GRANT ALL ON TABLE "public"."wrappers_fdw_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."wrappers_fdw_stats" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
