"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Circle } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { isAuthenticated } from "@/utils/supabase/auth";
import { ProgressTracker } from "@/utils/lessons/progress";
import { Lesson } from "@/types/lesson";

interface ProgressData {
  checkpointId: string;
  completed: boolean;
}

interface LessonCardProps {
  lesson: Lesson;
}

function LoadingCard() {
  return <div className="h-48 bg-gray-200 rounded animate-pulse" />;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [hasAuth, setHasAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const progressTracker = new ProgressTracker();
  const t = useTranslations("lessons");

  useEffect(() => {
    async function initialize() {
      try {
        const auth = await isAuthenticated();
        setHasAuth(auth);

        if (auth) {
          const lessonProgress = await progressTracker.getLessonProgress(
            lesson.id,
          );
          setProgress(lessonProgress);
        }
      } catch (error) {
        console.error(
          `Failed to load progress for lesson ${lesson.id}:`,
          error,
        );
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, [lesson.id]);

  if (isLoading) {
    return <LoadingCard />;
  }

  const totalQuestions = Object.values(lesson.sections)
    .filter((section) => section.type === "checkpoints")
    .reduce((acc, section) => acc + (section.items?.length || 0), 0);

  const completedCount = progress.filter((p) => p.completed).length;
  const progressPercentage =
    totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

  const status = !hasAuth
    ? "not-started"
    : completedCount === 0
      ? "not-started"
      : completedCount === totalQuestions
        ? "completed"
        : "in-progress";

  return (
    <Link href={`/lessons/${lesson.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <CardHeader>
          <div className="flex justify-between items-start">
            {status === "completed" ? (
              <CheckCircle className="text-green-500 h-6 w-6" />
            ) : (
              <Circle className="text-gray-300 h-6 w-6" />
            )}
            <div className="w-2" />
            <CardTitle className="text-xl">
              {t("lesson")} {lesson.order}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {status === "completed"
                  ? t("completed")
                  : status === "in-progress"
                    ? t("continue")
                    : t("notStarted")}
              </span>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>

            {status !== "not-started" && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            )}

            {status !== "not-started" && (
              <div className="text-sm text-gray-600">
                {t("progress")}: {completedCount} / {totalQuestions}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
