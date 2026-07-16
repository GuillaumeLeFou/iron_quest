import { Quest } from "@/types/quest";

import { supabase } from "@/lib/supabase";

export async function getQuests(): Promise<Quest[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("quests").select("*");
  if (error || !data) return [];

  let userProgressions: Record<string, number> = {};

  if (user) {
    const { data: userQuests } = await supabase
      .from("user_quests")
      .select("quest_id, progression")
      .eq("user_id", user.id);

    if (userQuests) {
      userProgressions = Object.fromEntries(
        userQuests.map((uq) => [uq.quest_id, uq.progression]),
      );
    }
  }

  return data.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description ?? "",
    type: q.type as "daily" | "weekly",
    goal: q.goal,
    progression: userProgressions[q.id] ?? 0,
  }));
}
