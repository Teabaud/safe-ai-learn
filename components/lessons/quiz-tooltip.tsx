"use client";

import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

function QuizInfoTooltip() {
  const t = useTranslations("lessons");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
        className="p-1 ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label={t("howToUse")}
      >
        <Info className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-72 p-4 mt-2 -left-2 text-sm bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="space-y-2 text-gray-600">
            <p>{t("quizInfo.answering")}</p>
            <p>{t("quizInfo.completion")}</p>
            <p className="text-gray-400 italic">{t("quizInfo.saving")}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizInfoTooltip;
