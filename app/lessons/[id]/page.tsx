import LessonCheckList from "@/components/lessons/checklist";
import { Lesson, Language, sampleLesson } from "@/types/lesson";

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
  const language: Language = "en";

  return (
    <div>
      {/* Other lesson content */}
      <LessonCheckList lesson={lesson} language={language} />
    </div>
  );
}
