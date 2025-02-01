import HeaderAuth from "@/components/navbar/header-auth";
import { ThemeSwitcher } from "@/components/navbar/theme-switcher";
import { EnvVarWarning } from "@/components/navbar/env-var-warning";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import LanguageSwitcher from "@/components/navbar/locale-switcher";
import { getTranslations } from "next-intl/server";

export default async function Navbar() {
  const t = await getTranslations("nav");

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={`/`}>{t("home")}</Link>
        </div>
        <div className="flex items-center gap-4">
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
