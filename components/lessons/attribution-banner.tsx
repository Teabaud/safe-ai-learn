import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

const CourseAttributionBanner = () => {
  const t = useTranslations("attribution");

  return (
    <Alert className="mb-6 bg-blue-50">
      <AlertTitle className="text-lg font-semibold flex items-center gap-2">
        {t("title")}
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-gray-700">
          {t("description.before")}{" "}
          <a
            href="https://course.aisafetyfundamentals.com/alignment"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
          >
            {t("description.linkText")}
            <ExternalLink className="h-4 w-4" />
          </a>{" "}
          {t("description.after")}
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default CourseAttributionBanner;
