import React from "react";

import { sampleLesson } from "@/types/lesson";
import LessonSummary from "@/components/lessons/summary";
import LessonResource from "@/components/lessons/resources";
import LessonQuizz from "@/components/lessons/quizz";
import LessonCheckList from "@/components/lessons/checklist";

export default function LessonPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <LessonSummary lesson={sampleLesson} />
      <LessonResource lesson={sampleLesson} />
      <LessonQuizz lesson={sampleLesson} />
      <LessonCheckList lesson={sampleLesson} />
    </div>
  );
}
