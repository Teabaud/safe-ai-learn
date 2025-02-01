import { Lesson, sampleLesson } from "@/types/lesson";
import LessonCheckList from "@/components/lessons/checklist";
import LessonSummary from "@/components/lessons/summary";
import LessonResource from "@/components/lessons/resources";
import LessonQuizz from "@/components/lessons/quizz";
import { getLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/locales.config";

function getLesson(id: string): Lesson {
  console.log(`Fetching lesson with id: ${id}`);
  return sampleLesson;
}

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const lessonId = (await params).id;
  const lesson = getLesson(lessonId);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("lessons");

  if (!lesson.translations.hasOwnProperty(locale)) {
    return <div>{t("noTranslation")}</div>;
  }

  return (
    <div>
      <LessonSummary lesson={sampleLesson} />
      <LessonResource lesson={sampleLesson} />
      <LessonQuizz lesson={sampleLesson} />
      <LessonCheckList lesson={lesson} />
    </div>
  );
}
