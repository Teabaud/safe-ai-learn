import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function isAuthenticated() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
}
