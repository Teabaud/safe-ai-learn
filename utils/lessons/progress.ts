"use client";

import { createClient } from "@/utils/supabase/client";
import { LessonProgress } from "@/types/lesson";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";

export class ProgressTracker {
  private supabase = createClient();

  async saveProgress(
    progress: Omit<LessonProgress, "lastUpdated" | "userId">,
  ): Promise<void> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    if (!user) return;

    const { error } = await this.supabase.from("lesson_progress").upsert({
      ...snakecaseKeys(progress),
      user_id: user.id,
      last_updated: new Date().toISOString(),
    });

    if (error) throw error;
  }

  async getLessonProgress(lessonId: string): Promise<LessonProgress[]> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await this.supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId)
      .eq("completed", true);

    if (error) throw error;
    if (!data) return [];

    return camelcaseKeys(data) as LessonProgress[];
  }
}
