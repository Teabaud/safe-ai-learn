import { ThemeSwitcher } from "@/components/navbar/theme-switcher";
import LanguageSwitcher from "@/components/navbar/locale-switcher";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import UserNav from "./user-nav";
import { ShipWheel, Book, Info } from "lucide-react";

export function NavBar() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Left section */}
        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" className="flex items-center space-x-2">
                  <ShipWheel className="h-6 w-6" />
                  <span className="font-bold">SAIL</span>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/about"
                  className="flex items-center space-x-2 px-4 py-2"
                >
                  <Info className="h-4 w-4" />
                  <span>{t("about")}</span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Center section - Lessons button */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/lessons">
            <Button variant="default" className="gap-2">
              <Book className="h-4 w-4" />
              {t("lessons")}
            </Button>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
