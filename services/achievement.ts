import {
  Achievement,
  AchievementCategory,
  AchievementRarity,
} from "@/types/achievement";

import { supabase } from "@/lib/supabase";

export async function getAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabase.from("achievements").select("*");
  if (error || !data) return [];

  return data.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description ?? "",
    category: a.category as AchievementCategory,
    rarity: a.rarity as AchievementRarity,
    objective: a.objective,
  }));
}

export async function saveUnlockedAchievement(
  achievementId: string,
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("user_achievements").insert({
    user_id: user.id,
    achievement_id: achievementId,
  });
}
