"use client";

import { Lesson } from "@/types/lesson";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Locale } from "@/locales.config";
import { useLocale, useTranslations } from "next-intl";

interface LessonQuizzProps {
  lesson: Lesson;
}

export function LessonQuizz({ lesson }: LessonQuizzProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);

  const t = useTranslations("lessons");
  const locale = useLocale() as Locale;
  const checkQuestions = lesson.translations[locale].checkQuestions;
  const totalQuestions: number = checkQuestions.length;

  const handleSubmitAnswer = (): void => {
    if (answer.trim()) {
      setAnswers([...answers, answer]);
      setAnswer("");
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{t("questions")}</h3>
        <div className="space-y-4">
          <p className="font-medium">
            {currentQuestion + 1}/{totalQuestions}:{" "}
            {checkQuestions[currentQuestion].text}
          </p>
          <div className="space-y-2">
            <input
              type="text"
              value={answer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer(e.target.value)
              }
              placeholder={t("typeAnswer")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmitAnswer}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span>{t("submitAnswer")}</span>
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Previous Answers */}
        {answers.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">
              {t("previousAnswers")} ({answers.length})
            </h3>
            <div className="space-y-2">
              {answers.map((ans, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <p className="font-medium text-sm text-gray-600">
                    {checkQuestions[index].text}
                  </p>
                  <p className="mt-1">{ans}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonQuizz;
