import { Locale } from "@/locales.config";

export type SectionType =
  | "key-concepts"
  | "summary"
  | "resources"
  | "checkpoints";

interface BaseSection {
  type: SectionType;
}

// Template types - lesson structure
interface KeyConceptsTemplate extends BaseSection {
  type: "key-concepts";
}

interface SummaryTemplate extends BaseSection {
  type: "summary";
}

interface ResourcesTemplate extends BaseSection {
  type: "resources";
  items: string[]; // Resource IDs
}

interface CheckpointsTemplate extends BaseSection {
  type: "checkpoints";
  items: string[]; // Checkpoint IDs
}

export type SectionTemplate =
  | KeyConceptsTemplate
  | SummaryTemplate
  | ResourcesTemplate
  | CheckpointsTemplate;

export interface LessonTemplate {
  id: string;
  order: number;
  sections: Record<string, SectionTemplate>;
}

// Content types - actual lesson content
export interface KeyConceptsSection extends BaseSection {
  type: "key-concepts";
  concepts: string[];
}

export interface SummarySection extends BaseSection {
  type: "summary";
  text: string;
}

export interface ResourceSection extends BaseSection {
  type: "resources";
  items: {
    id: string;
    title: string;
    url: string;
    details: string;
  }[];
}

export interface CheckpointSection extends BaseSection {
  type: "checkpoints";
  items: {
    id: string;
    text: string;
  }[];
}

export type Section =
  | KeyConceptsSection
  | SummarySection
  | ResourceSection
  | CheckpointSection;

export interface Lesson {
  id: string;
  order: number;
  title: string;
  locale: Locale;
  sections: Record<string, Section>;
}

// Progress tracking
export interface LessonProgress {
  userId: string;
  lessonId: string;
  checkpointId: string;
  completed: boolean;
  answer?: string;
  lastUpdated: Date;
}

// Database types (for Supabase)
// export interface LessonProgressRow {
//   id: string;
//   user_id: string;
//   lesson_id: string;
//   completed_items: string[];
//   last_accessed: string;
//   is_completed: boolean;
//   created_at: string;
// }

// export interface Database {
//   public: {
//     Tables: {
//       lesson_progress: {
//         Row: LessonProgressRow;
//         Insert: Omit<LessonProgressRow, "id" | "created_at">;
//         Update: Partial<Omit<LessonProgressRow, "id" | "created_at">>;
//       };
//     };
//   };
// }
