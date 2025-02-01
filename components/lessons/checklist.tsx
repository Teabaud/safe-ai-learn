"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lesson } from "@/types/lesson";
import { CheckListItem } from "./checklist-item";
import { isAuthenticated } from "@/utils/supabase/auth";
import { fetchProgress, saveProgress } from "@/utils/lessons/progress";
import { useLocale, useTranslations } from 'next-intl';
import { Locale } from "@/locales.config";

function AuthRequired() {
  const t = useTranslations("lessons");
  return (
    <Alert className="mb-4">
      <AlertDescription>{t("anonUserMessage")}</AlertDescription>
    </Alert>
  );
}

interface LessonCheckListProps {
  lesson: Lesson;
}

function LessonCheckList({ lesson }: LessonCheckListProps) {
  const [checked, setChecked] = useState<string[]>([]);
  const [hasAuth, setHasAuth] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const t = useTranslations("lessons");
  const locale = useLocale() as Locale;
  const checkQuestions = lesson.translations[locale].checkQuestions;

  useEffect(() => {
    initializeChecklist();
  }, [lesson.id]);

  async function initializeChecklist() {
    setIsLoading(true);
    const auth = await isAuthenticated();
    setHasAuth(auth);

    if (auth) {
      const progress = await fetchProgress(lesson.id);
      setChecked(progress.completedItems);
    }

    setIsLoading(false);
  }

  async function handleToggle(itemId: string) {
    if (!hasAuth) {
      setShowAuthAlert(true);
      return;
    }

    const newChecked = checked.includes(itemId)
      ? checked.filter((id) => id !== itemId)
      : [...checked, itemId];

    setChecked(newChecked);
    const isCompleted = newChecked.length === checkQuestions.length;
    await saveProgress({
      lessonId: lesson.id,
      completedItems: newChecked,
      isCompleted,
    });
  }

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 space-y-4">
        {showAuthAlert && <AuthRequired />}

        {checkQuestions.map((question) => (
          <CheckListItem
            key={question.id}
            id={question.id}
            text={question.text}
            isChecked={checked.includes(question.id)}
            onToggle={handleToggle}
          />
        ))}

        <div className="mt-4 text-sm text-gray-600">
          {t('progress')}: {checked.length} / {checkQuestions.length}
        </div>
      </div>
    </div>
  );
}

export default LessonCheckList;