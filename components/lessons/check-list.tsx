"use client";

import { useState, useEffect } from "react";
import { Alert } from "@/components/ui/alert";
import { createClient } from "@/utils/supabase/client";

interface CheckListProps {
  lessonId: string;
  items: Array<{ id: string; text: string }>;
}

const CheckList = ({ lessonId, items }: CheckListProps) => {
  const supabase = createClient();
  const [checked, setChecked] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthAlert, setShowAuthAlert] = useState<boolean>(false);

  useEffect(() => {
    // Check authentication status
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      // If authenticated, load progress
      if (session) {
        loadProgress();
      }
    };

    checkSession();
  }, []);

  const loadProgress = async () => {
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("completed_items")
      .match({ lesson_id: lessonId })
      .single();

    if (progress) {
      setChecked(progress.completed_items);
    }
  };

  const handleCheck = async (itemId: string) => {
    if (!isAuthenticated) {
      setShowAuthAlert(true);
      return;
    }

    const newChecked = checked.includes(itemId)
      ? checked.filter((id) => id !== itemId)
      : [...checked, itemId];

    setChecked(newChecked);

    // Update progress in database
    await supabase.from("lesson_progress").upsert({
      lesson_id: lessonId,
      completed_items: newChecked,
      is_completed: newChecked.length === items.length,
    });
  };

  return (
    <div className="space-y-4">
      {showAuthAlert && (
        <Alert className="mb-4">
          <p>Sign in to track your progress!</p>
        </Alert>
      )}

      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checked.includes(item.id)}
            onChange={() => handleCheck(item.id)}
            className="h-4 w-4"
          />
          <span>{item.text}</span>
        </div>
      ))}

      <div className="mt-4 text-sm text-gray-600">
        Progress: {checked.length} / {items.length}
      </div>
    </div>
  );
};

export default CheckList;
