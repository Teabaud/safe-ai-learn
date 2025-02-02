import { readFile, readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { LessonTemplate } from "@/types/lesson";
import { Locale } from "@/locales.config";

export async function validateLesson(
  lessonPath: string,
  languages: Locale[],
): Promise<string[]> {
  const errors: string[] = [];

  try {
    // Read and parse template
    const templateContent = await readFile(
      path.join(lessonPath, "template.json"),
      "utf-8",
    );
    const template: LessonTemplate = JSON.parse(templateContent);

    // Validate each language
    for (const lang of languages) {
      const mdPath = path.join(lessonPath, `${lang}.md`);
      try {
        const content = await readFile(mdPath, "utf-8");
        const { data: frontmatter, content: mdContent } = matter(content);

        // Validate frontmatter
        if (frontmatter.lessonId !== template.id) {
          errors.push(`${lang}: Invalid lessonId in frontmatter`);
        }

        // Validate required sections
        for (const [sectionId, section] of Object.entries(template.sections)) {
          if (!mdContent.includes(`[${sectionId}]`)) {
            errors.push(`${lang}: Missing required section ${sectionId}`);
          }

          // Validate section-specific items
          if ("items" in section) {
            for (const itemId of section.items) {
              if (!mdContent.includes(`[${itemId}]`)) {
                errors.push(
                  `${lang}: Missing item ${itemId} in section ${sectionId}`,
                );
              }
            }
          }
        }
      } catch (e: unknown) {
        const error = e as Error;
        errors.push(
          `${lang}: Failed to read/parse markdown - ${error.message}`,
        );
      }
    }
  } catch (e: unknown) {
    const error = e as Error;
    errors.push(`Failed to read/parse template.json - ${error.message}`);
  }

  return errors;
}
