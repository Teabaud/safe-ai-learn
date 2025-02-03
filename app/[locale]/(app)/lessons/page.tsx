import { listLessons } from "@/utils/lessons/lessonLoader";
import { getLocale } from "next-intl/server";
import { Locale } from "@/locales.config";
import { LessonCard } from "@/components/lessons/lesson-card";

export default async function LessonsPage() {
  const locale = (await getLocale()) as Locale;
  const lessonsRecord = await listLessons(locale);
  const lessons = Object.values(lessonsRecord);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
