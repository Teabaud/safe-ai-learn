import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UserSettings from "@/components/settings/settings";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <UserSettings />;
}
