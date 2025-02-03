import {
  CheckpointSection,
  KeyConceptsSection,
  ResourceSection,
  SummarySection,
} from "@/types/lesson";
import { loadLesson } from "@/utils/lessons/lessonLoader";
import LessonSummary from "@/components/lessons/summary";
import LessonResource from "@/components/lessons/resources";
import LessonKeyConcepts from "@/components/lessons/key-concepts";
import LessonQuiz from "@/components/lessons/checkpoints";
import { getLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/locales.config";

function renderSection(lessonId: string, section: any) {
  switch (section.type) {
    case "key-concepts":
      const keyConcepts = section as KeyConceptsSection;
      return <LessonKeyConcepts keyConcepts={keyConcepts} />;
    case "summary":
      const summary = section as SummarySection;
      return <LessonSummary summary={summary} />;
    case "resources":
      const resources = section as ResourceSection;
      return <LessonResource resources={resources} />;
    case "checkpoints":
      const checkpoints = section as CheckpointSection;
      return <LessonQuiz lessonId={lessonId} checkpoints={checkpoints} />;
    default:
      return null;
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("lessons");
  const lessonId = (await params).id;
  const locale = (await getLocale()) as Locale;
  const lesson = await loadLesson(lessonId, locale);

  if (!lesson) {
    return <div>{t("noTranslation")}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">{lesson.title}</h1>
      <div className="max-w-4xl mx-auto p-6">
        {Object.entries(lesson.sections).map(([sectionId, section]) => (
          <div key={sectionId} className="mb-8">
            {renderSection(lesson.id, section)}
          </div>
        ))}
      </div>
    </div>
  );
}
