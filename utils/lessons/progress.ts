import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface Progress {
  lessonId: string;
  completedItems: string[];
  isCompleted: boolean;
}

export async function fetchProgress(lessonId: string): Promise<Progress> {
  const { data } = await supabase
    .from("lesson_progress")
    .select("completed_items")
    .match({ lesson_id: lessonId })
    .single();

  const completedItems = data?.completed_items || [];
  return { lessonId, completedItems, isCompleted: false };
}

export async function saveProgress({
  lessonId,
  completedItems,
  isCompleted,
}: Progress): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      completed_items: completedItems,
      is_completed: isCompleted,
    },
    {
      onConflict: "user_id,lesson_id",
    },
  );
}
