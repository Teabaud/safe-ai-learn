import React from "react";

import { sampleLesson, Language } from "@/types/lesson";
import LessonSummary from "@/components/lessons/summary";
import LessonResource from "@/components/lessons/resources";
import LessonQuizz from "@/components/lessons/quizz";
import LessonCheckList from "@/components/lessons/checklist";

export default function LessonPage() {
  const currentLanguage: Language = "en";

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <LessonSummary lesson={sampleLesson} language={currentLanguage} />
      <LessonResource lesson={sampleLesson} language={currentLanguage} />
      <LessonQuizz lesson={sampleLesson} language={currentLanguage} />
      <LessonCheckList lesson={sampleLesson} language={currentLanguage} />
    </div>
  );
}
