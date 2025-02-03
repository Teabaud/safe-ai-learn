import { Lesson, LessonTemplate, Section } from "@/types/lesson";
import { Locale } from "@/locales.config";
import { readdir, readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";

const lessonsDir =
  process.env.LESSONS_DIR || path.join(process.cwd(), "lessons");

async function loadTemplate(lessonId: string): Promise<LessonTemplate> {
  const templatePath = path.join(lessonsDir, lessonId, "template.json");
  const templateContent = await readFile(templatePath, "utf-8");
  return JSON.parse(templateContent);
}

export async function listLessonsTemplates(): Promise<LessonTemplate[]> {
  const lessons: LessonTemplate[] = [];
  const entries = await readdir(lessonsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      try {
        const template = await loadTemplate(entry.name);
        lessons.push(template);
      } catch (e) {
        console.error(`Failed to load lesson ${entry.name}:`, e);
      }
    }
  }

  return lessons.sort((a, b) => a.order - b.order);
}

export async function listLessons(
  locale: Locale,
): Promise<Record<string, Lesson>> {
  const lessons: Record<string, Lesson> = {};
  const templates = await listLessonsTemplates();

  for (const template of templates) {
    const lesson = await loadLesson(template.id, locale);
    if (lesson) {
      lessons[lesson.id] = lesson;
    }
  }

  return lessons;
}

export async function loadLesson(
  lessonId: string,
  locale: Locale,
): Promise<Lesson | null> {
  try {
    // Load template first
    const template = await loadTemplate(lessonId);

    // Load content
    const mdPath = path.join(lessonsDir, lessonId, `${locale}.md`);
    const content = await readFile(mdPath, "utf-8");
    const { data: frontmatter, content: mdContent } = matter(content);

    // Parse sections from markdown
    const sections: Record<string, Section> = {};

    for (const [sectionId, sectionTemplate] of Object.entries(
      template.sections,
    )) {
      const sectionMatch = mdContent.match(
        new RegExp(`# \\[${sectionId}\\].*?\\n\\n(.*?)(?=# \\[|$)`, "s"),
      );

      if (sectionMatch) {
        const sectionContent = sectionMatch[1].trim();

        switch (sectionTemplate.type) {
          case "key-concepts":
            sections[sectionId] = {
              type: "key-concepts",
              concepts: parseList(sectionContent),
            };
            break;

          case "summary":
            sections[sectionId] = {
              type: "summary",
              text: sectionContent,
            };
            break;

          case "resources":
            sections[sectionId] = {
              type: "resources",
              items: parseResources(sectionContent),
            };
            break;

          case "checkpoints":
            sections[sectionId] = {
              type: "checkpoints",
              items: parseCheckpoints(sectionContent),
            };
            break;
        }
      }
    }

    return {
      id: template.id,
      order: template.order,
      title: frontmatter.title,
      locale,
      sections,
    };
  } catch (e) {
    console.debug(`Failed to load lesson ${lessonId} in ${locale}:`, e);
    return null;
  }
}

// Helper functions for parsing markdown content
function parseList(content: string): string[] {
  return content
    .split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace(/^-\s*/, "").trim());
}

function parseResources(
  content: string,
): { id: string; title: string; url: string; details: string }[] {
  const resources: {
    id: string;
    title: string;
    url: string;
    details: string;
  }[] = [];
  const lines = content.split("\n");

  let currentResource: Partial<{
    id: string;
    title: string;
    url: string;
    details: string;
  }> = {};

  for (const line of lines) {
    const resourceMatch = line.match(
      /^-\s*\[([^\]]+)\]\s*\[([^\]]+)\]\((.*?)\)/,
    );
    if (resourceMatch) {
      if (currentResource.id) {
        resources.push(currentResource as any);
      }
      currentResource = {
        id: resourceMatch[1],
        title: resourceMatch[2],
        url: resourceMatch[3],
        details: "",
      };
    } else if (currentResource.id && line.trim()) {
      currentResource.details = line.trim();
    }
  }

  if (currentResource.id) {
    resources.push(currentResource as any);
  }

  return resources;
}

function parseCheckpoints(content: string): { id: string; text: string }[] {
  return content
    .split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => {
      const match = line.match(/^-\s*\[([^\]]+)\]\s*(.*)/);
      return match
        ? {
            id: match[1],
            text: match[2].trim(),
          }
        : null;
    })
    .filter((item): item is { id: string; text: string } => item !== null);
}
