import React from "react";

import {
  sampleLesson,
  LessonTranslation,
  Language,
} from "@/utils/lessons/loader";
import { LessonSummary } from "@/components/lessons/summary";
import { LessonResource } from "@/components/lessons/resources";
import { LessonQuizz } from "@/components/lessons/quizz";

import { createClient } from "@/utils/supabase/server";

async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.from("your_table").select();
  // ... rest of your component
}

export default function Lesson() {
  const currentLanguage: Language = "en";
  const lesson: LessonTranslation = sampleLesson.translations[currentLanguage];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <LessonSummary lesson={lesson} />
      <LessonResource lesson={lesson} language={currentLanguage} />
      <LessonQuizz lesson={lesson} language={currentLanguage} />
    </div>
  );
}
