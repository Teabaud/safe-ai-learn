import React from "react";
import { Lesson, Language } from "@/types/lesson";

interface LessonSummaryProps {
  lesson: Lesson;
  language: Language;
}

export function LessonSummary({ lesson, language }: LessonSummaryProps) {
  const title = lesson.translations[language].title;
  const summary = lesson.translations[language].summary;

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
