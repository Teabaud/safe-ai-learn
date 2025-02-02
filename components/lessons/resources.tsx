import { ResourceSection } from "@/types/lesson";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Markdown from "react-markdown";

interface LessonResourceProps {
  resources: ResourceSection;
}

type Resource = {
  id: string;
  title: string;
  url: string;
  details: string;
};

function ResourcesBox({ resource }: { resource: Resource }) {
  return (
    <div
      key={resource.id}
      className="group rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {resource.title}
            <ExternalLink className="h-4 w-4" />
          </a>
          <Markdown className="mt-2 text-gray-600 dark:text-gray-300">
            {resource.details}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

function LessonResource({ resources }: LessonResourceProps) {
  const t = useTranslations("lessons");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{t("resources")}</h3>

        <div className="space-y-6">
          {resources.items.map((resource) => (
            <ResourcesBox resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LessonResource;
