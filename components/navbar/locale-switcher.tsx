"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { locales } from "@/locales.config";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleChange = (newLocale: string) => {
    router.push(pathname.replace(`/${currentLocale}`, `/${newLocale}`));
  };

  return (
    <Select value={currentLocale} onValueChange={handleChange}>
      <SelectTrigger className="flex items-center gap-2">
        <Globe size={16} />
        {/* <SelectValue /> */}
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
