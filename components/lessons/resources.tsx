import { Lesson } from "@/types/lesson";
import { ExternalLink } from "lucide-react";
import { Locale } from "@/locales.config";
import { useTranslations, useLocale } from "next-intl";

interface LessonResourceProps {
  lesson: Lesson;
}

export function LessonResource({ lesson }: LessonResourceProps) {
  const t = useTranslations("lessons");
  const locale = useLocale() as Locale;
  const resources = lesson.translations[locale].resources;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{t("resources")}</h3>
        <ul className="space-y-2">
          {resources.map((resource, index) => (
            <li key={index} className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LessonResource;
