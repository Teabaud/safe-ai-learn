import React from "react";
import { Lesson } from "@/types/lesson";
import { Locale } from "@/locales.config";
import { useTranslations, useLocale } from "next-intl";

interface LessonSummaryProps {
  lesson: Lesson;
}

export function LessonSummary({ lesson }: LessonSummaryProps) {
  const t = useTranslations("lessons");
  const locale = useLocale() as Locale;
  const title = lesson.translations[locale].title;
  const summary = lesson.translations[locale].summary;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{summary}</p>
      </div>
    </div>
  );
}

export default LessonSummary;
