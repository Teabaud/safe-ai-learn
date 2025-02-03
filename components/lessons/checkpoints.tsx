"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckpointSection } from "@/types/lesson";
import { isAuthenticated } from "@/utils/supabase/client";
import { ProgressTracker } from "@/utils/lessons/progress";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp, Edit2, Check } from "lucide-react";
import Markdown from "react-markdown";
import QuizTooltip from "./quiz-tooltip";

function AuthRequired() {
  const t = useTranslations("lessons");
  return (
    <Alert className="mb-4">
      <AlertDescription>{t("anonUserMessage")}</AlertDescription>
    </Alert>
  );
}

interface LessonQuizProps {
  lessonId: string;
  checkpoints: CheckpointSection;
}

interface Answer {
  questionId: string;
  text: string;
  lastModified: Date;
}

export function LessonQuiz({ lessonId, checkpoints }: LessonQuizProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [hasAuth, setHasAuth] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Store current answers in a map keyed by question ID
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>(
    {},
  );
  const progressTracker = new ProgressTracker();

  const t = useTranslations("lessons");
  const checkQuestions = checkpoints.items;

  useEffect(() => {
    initializeProgress();
  }, [lessonId]);

  async function initializeProgress() {
    setIsLoading(true);
    const auth = await isAuthenticated();
    setHasAuth(auth);

    if (auth) {
      const progress = await progressTracker.getLessonProgress(lessonId);
      setCompleted(progress.map((p) => p.checkpointId));
    }

    setIsLoading(false);
  }

  async function handleToggleComplete(questionId: string) {
    if (!hasAuth) {
      setShowAuthAlert(true);
      return;
    }

    const newCompleted = completed.includes(questionId)
      ? completed.filter((id) => id !== questionId)
      : [...completed, questionId];

    setCompleted(newCompleted);
    await progressTracker.saveProgress({
      lessonId: lessonId,
      checkpointId: questionId,
      completed: newCompleted.includes(questionId),
    });
  }

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  const handleSubmitAnswer = (questionId: string): void => {
    const currentAnswer = currentAnswers[questionId];
    if (currentAnswer?.trim()) {
      setAnswers({
        ...answers,
        [questionId]: {
          questionId,
          text: currentAnswer,
          lastModified: new Date(),
        },
      });
      // Keep the active question open for further editing
      setActiveQuestion(questionId);
    }
  };

  // When opening a question, pre-fill with existing answer if any
  const handleQuestionClick = (questionId: string) => {
    if (activeQuestion === questionId) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(questionId);
      // Pre-fill with existing answer if available
      if (answers[questionId] && !currentAnswers[questionId]) {
        setCurrentAnswers({
          ...currentAnswers,
          [questionId]: answers[questionId].text,
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-bold">{t("questions")}</h3>
          <QuizTooltip />
        </div>
        {showAuthAlert && <AuthRequired />}

        <div className="space-y-4">
          {checkQuestions.map((question, index) => {
            const isActive = activeQuestion === question.id;
            const hasAnswer = question.id in answers;
            const isCompleted = completed.includes(question.id);

            return (
              <div
                key={question.id}
                className="border rounded-lg overflow-hidden bg-gray-50"
              >
                {/* Question Header */}
                <div className="flex items-start">
                  {/* Checkbox */}
                  <div
                    className="p-4 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(question.id);
                    }}
                  >
                    <div
                      className={`w-5 h-5 border-2 rounded flex items-center justify-center
                      ${
                        isCompleted
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {isCompleted && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>

                  {/* Question Content */}
                  <div
                    className={`flex-1 p-4 flex items-start justify-between cursor-pointer ${
                      isActive ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleQuestionClick(question.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-600">
                          {index + 1}.
                        </span>
                        <Markdown className="font-medium text-gray-600">
                          {question.text}
                        </Markdown>
                      </div>
                      {hasAnswer && !isActive && (
                        <div className="mt-2 text-gray-600">
                          {answers[question.id].text}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {hasAnswer && <Check className="w-4 h-4 text-blue-500" />}
                      {isActive ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Answer Input Section */}
                {isActive && (
                  <div className="p-4 bg-white border-t">
                    <textarea
                      value={currentAnswers[question.id] || ""}
                      onChange={(e) =>
                        setCurrentAnswers({
                          ...currentAnswers,
                          [question.id]: e.target.value,
                        })
                      }
                      placeholder={t("typeAnswer")}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => handleSubmitAnswer(question.id)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {hasAnswer ? t("saveChanges") : t("submitAnswer")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700">{t("progress")}</h4>
            <div className="text-sm text-gray-600">
              {completed.length}/{checkQuestions.length} {t("completed")}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${(completed.length / checkQuestions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonQuiz;
