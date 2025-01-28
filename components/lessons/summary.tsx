import React from 'react';
import { LessonTranslation } from '@/utils/lessons/loader';


export function LessonSummary({ lesson }: { lesson: LessonTranslation }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
        <p className="text-gray-600">{lesson.summary}</p>
      </div>
    </div>
  );
}
