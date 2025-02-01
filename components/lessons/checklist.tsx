"use client";

import { useState, useEffect } from "react";
import { Alert } from "@/components/ui/alert";
import { createClient } from "@/utils/supabase/client";
import { Lesson, Language } from "@/types/lesson";

interface LessonCheckListProps {
  lesson: Lesson;
  language: Language;
}

function CheckList({ lesson, language }: LessonCheckListProps) {
  const supabase = createClient();
  const [checked, setChecked] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthAlert, setShowAuthAlert] = useState<boolean>(false);

  const lessonId = lesson.id;
  const checkQuestions = lesson.translations[language].checkQuestions;

  useEffect(() => {
    // Check authentication status
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      // If authenticated, load progress
      if (session) {
        loadProgress();
      }
    };

    checkSession();
  }, []);

  const loadProgress = async () => {
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("completed_items")
      .match({ lesson_id: lessonId })
      .single();

    if (progress) {
      setChecked(progress.completed_items);
    }
  };

  const handleCheck = async (itemId: string) => {
    if (!isAuthenticated) {
      setShowAuthAlert(true);
      return;
    }

    const newChecked = checked.includes(itemId)
      ? checked.filter((id) => id !== itemId)
      : [...checked, itemId];

    setChecked(newChecked);

    // Update progress in database
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("lesson_progress").upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          completed_items: newChecked,
          is_completed: newChecked.length === checkQuestions.length,
        },
        {
          onConflict: "user_id,lesson_id",
        },
      );
    }
  };

  return (
    <div className="space-y-4">
      {showAuthAlert && (
        <Alert className="mb-4">
          <p>Sign in to track your progress!</p>
        </Alert>
      )}

      {checkQuestions.map((checkQuestion) => (
        <div key={checkQuestion.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checked.includes(checkQuestion.id)}
            onChange={() => handleCheck(checkQuestion.id)}
            className="h-4 w-4"
          />
          <span>{checkQuestion.text}</span>
        </div>
      ))}

      <div className="mt-4 text-sm text-gray-600">
        Progress: {checked.length} / {checkQuestions.length}
      </div>
    </div>
  );
}

function LessonCheckList({ lesson, language }: LessonCheckListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <CheckList lesson={lesson} language={language} />
      </div>
    </div>
  );
}

export default LessonCheckList;
