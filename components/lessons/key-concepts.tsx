import { KeyConceptsSection } from "@/types/lesson";
import { useTranslations } from "next-intl";

interface LessonKeyConceptsProps {
  keyConcepts: KeyConceptsSection;
}

export function LessonResource({ keyConcepts }: LessonKeyConceptsProps) {
  const t = useTranslations("lessons");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{t("keyConcepts")}</h3>
        <span className="flex items-center space-x-2 text-gray-600">
          {keyConcepts.concepts.map((keyConcept, index) => (
            <span key={index}>
              {keyConcept}
              {index < keyConcepts.concepts.length - 1 && ", "}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export default LessonResource;
