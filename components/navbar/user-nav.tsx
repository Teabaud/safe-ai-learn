import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogIn, LogOut, Settings } from "lucide-react";
import { signOutAction } from "@/app/[locale]/(app)/actions";
import { getUser } from "@/utils/supabase/server";

function SignInUp() {
  const t = useTranslations("nav");

  return (
    <div className="flex items-center space-x-2">
      <Link href="/sign-in">
        <Button variant="outline" size="sm">
          <LogIn className="mr-2 h-4 w-4" />
          {t("signIn")}
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="default" size="sm">
          {t("signUp")}
        </Button>
      </Link>
    </div>
  );
}

function UserDropdown() {
  const t = useTranslations("nav");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative gap-2">
          <User className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <Link href="/protected">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            {t("profile")}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <DropdownMenuItem asChild>
            <button className="w-full text-left" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              {t("signOut")}
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default async function AuthButton() {
  const user = await getUser();
  return user ? <UserDropdown /> : <SignInUp />;
}
