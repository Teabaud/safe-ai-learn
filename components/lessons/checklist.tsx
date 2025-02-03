"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckpointSection } from "@/types/lesson";
import { CheckListItem } from "./checklist-item";
import { isAuthenticated } from "@/utils/supabase/client";
import { ProgressTracker } from "@/utils/lessons/progress";
import { useTranslations } from "next-intl";

function AuthRequired() {
  const t = useTranslations("lessons");
  return (
    <Alert className="mb-4">
      <AlertDescription>{t("anonUserMessage")}</AlertDescription>
    </Alert>
  );
}

interface LessonCheckListProps {
  lessonId: string;
  checkpointsSection: CheckpointSection;
}

function LessonCheckList({
  lessonId,
  checkpointsSection,
}: LessonCheckListProps) {
  const [checked, setChecked] = useState<string[]>([]);
  const [hasAuth, setHasAuth] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const progressTracker = new ProgressTracker();

  const t = useTranslations("lessons");
  const checkQuestions = checkpointsSection.items;

  useEffect(() => {
    initializeChecklist();
  }, [lessonId]);

  async function initializeChecklist() {
    setIsLoading(true);
    const auth = await isAuthenticated();
    setHasAuth(auth);

    if (auth) {
      const progress = await progressTracker.getLessonProgress(lessonId);
      setChecked(progress.map((p) => p.checkpointId));
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
    await progressTracker.saveProgress({
      lessonId: lessonId,
      checkpointId: itemId,
      completed: newChecked.includes(itemId),
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
          {t("progress")}: {checked.length} / {checkQuestions.length}
        </div>
      </div>
    </div>
  );
}

export default LessonCheckList;
