import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const isAuthenticated = async () => {
  const supabase = createClient();
  const session = await supabase.auth.getSession();
  return !!session;
};
