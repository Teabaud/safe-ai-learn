import { Lesson, getTranslatedText, Language } from "@/types/lesson";
import { ExternalLink } from "lucide-react";

interface LessonResourceProps {
  lesson: Lesson;
  language: Language;
}

export function LessonResource({ lesson, language }: LessonResourceProps) {
  const resources = lesson.translations[language].resources;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">
          {getTranslatedText("resources", language)}
        </h3>
        <ul className="space-y-2">
          {resources.map((resource, index) => (
            <li key={index} className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LessonResource;
