import { signOutAction } from "@/app/[locale]/actions";
import Link from "next/link";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";

function UserDropdown({ user }: { user: User }) {
  const t = useTranslations("nav");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {user.email}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/protected">{t("profile")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/lessons">{t("lessons")}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <DropdownMenuItem asChild>
            <button className="w-full text-left" type="submit">
              {t("signOut")}
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SignInUp() {
  const t = useTranslations("auth");

  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">{t("login")}</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">{t("signup")}</Link>
      </Button>
    </div>
  );
}

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <UserDropdown user={user} /> : <SignInUp />;
}
