import { SummarySection } from "@/types/lesson";
import Markdown from "react-markdown";
import { useTranslations } from "next-intl";

interface LessonSummaryProps {
  summary: SummarySection;
}

export function LessonSummary({ summary }: LessonSummaryProps) {
  const t = useTranslations("lessons");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{t("summary")}</h2>
        <Markdown className="text-gray-600">{summary.text}</Markdown>
      </div>
    </div>
  );
}

export default LessonSummary;
