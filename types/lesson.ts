import { Locale } from "@/locales.config";

export type Resource = {
  title: string;
  url: string;
};

export type CheckQuestion = {
  id: string;
  text: string;
};

export type LessonTranslation = {
  keyConcepts: string[];
  title: string;
  summary: string;
  resources: Resource[];
  checkQuestions: CheckQuestion[];
};

export type Lesson = {
  id: string;
  translations: Record<Locale, LessonTranslation>;
};

export interface LessonProgress {
  lessonId: string;
  userId: string;
  completedItems: string[];
  lastAccessed: Date;
  isCompleted: boolean;
}

// Database types (for Supabase)
export interface LessonProgressRow {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_items: string[];
  last_accessed: string;
  is_completed: boolean;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      lesson_progress: {
        Row: LessonProgressRow;
        Insert: Omit<LessonProgressRow, "id" | "created_at">;
        Update: Partial<Omit<LessonProgressRow, "id" | "created_at">>;
      };
    };
  };
}

export const sampleLesson: Lesson = {
  id: "1",
  translations: {
    en: {
      title: "Introduction to AI Safety",
      summary: "This lesson covers the fundamental concepts of AI safety...",
      keyConcepts: ["AI Alignment", "Value Learning", "Safety Fundamentals"],
      resources: [
        { title: "AI Safety Fundamentals", url: "https://example.com/1" },
        { title: "Technical AI Safety", url: "https://example.com/2" },
      ],
      checkQuestions: [
        { id: "q1", text: "What do you understand by AI alignment?" },
        {
          id: "q2",
          text: "How would you explain the concept of value learning?",
        },
      ],
    },
    fr: {
      title: "Introduction à la sécurité de l'IA",
      summary: "Cette leçon couvre les concepts fondamentaux...",
      keyConcepts: [
        "Alignement de l'IA",
        "Apprentissage des valeurs",
        "Fondamentaux de la sécurité",
      ],
      resources: [
        {
          title: "Fondamentaux de la sécurité de l'IA",
          url: "https://example.com/1",
        },
        { title: "Sécurité technique de l'IA", url: "https://example.com/2" },
      ],
      checkQuestions: [
        { id: "q1", text: "Que comprenez-vous par alignement de l'IA ?" },
        {
          id: "q2",
          text: "Comment expliqueriez-vous le concept d'apprentissage des valeurs ?",
        },
      ],
    },
  },
};
