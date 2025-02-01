import { Lesson, sampleLesson } from "@/types/lesson";
import LessonCheckList from "@/components/lessons/checklist";
import LessonSummary from "@/components/lessons/summary";
import LessonResource from "@/components/lessons/resources";
import LessonQuizz from "@/components/lessons/quizz";

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

  return (
    <div>
      <LessonSummary lesson={sampleLesson} />
      <LessonResource lesson={sampleLesson} />
      <LessonQuizz lesson={sampleLesson} />
      <LessonCheckList lesson={lesson} />
    </div>
  );
}
