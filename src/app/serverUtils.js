import { createClient } from "@supabase/supabase-js";

/**
 * Lazy singleton: the Supabase admin client is created the FIRST TIME
 * any property is accessed (e.g. supabase.storage.from(...)), not when
 * the module is imported.
 *
 * Why this matters for Next.js / Vercel:
 *   During `next build`, Next.js statically analyses every page's import
 *   tree.  If `createClient()` runs at module-load time and
 *   NEXT_PUBLIC_SUPABASE_URL is not in the build environment, it throws
 *   "supabaseUrl is required" and the build fails.
 *
 *   By deferring the call behind a Proxy we ensure createClient() is only
 *   invoked at request-time (inside a Server Action or Route Handler),
 *   when env vars are always available.
 */

let _client = null;

function getClient() {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
      );
    }
    _client = createClient(url, key);
  }
  return _client;
}

/**
 * Drop-in replacement for the old `export const supabase = createClient(...)`.
 * All existing call sites (supabase.storage.from(...), etc.) work unchanged.
 */
export const supabase = new Proxy(
  {},
  {
    get(_, prop) {
      return getClient()[prop];
    },
    set(_, prop, value) {
      getClient()[prop] = value;
      return true;
    },
  }
);
