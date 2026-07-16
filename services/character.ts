import { supabase } from "@/lib/supabase";
import { Character } from "@/types/character";
import { Tables } from "@/types/supabase";

function mapCharacter(data: Tables<"characters">): Character {
  return {
    id: data.id,
    accountId: data.user_id,
    name: data.name,
    level: data.level,
    xp: data.xp,
    gold: data.gold,
    strength: data.strength,
    endurance: data.endurance,
    vitality: data.vitality,
    discipline: data.discipline,
    lifetimeVolume: data.lifetime_volume,
    lifetimeDistance: data.lifetime_distance,
    lifetimeWorkouts: data.lifetime_workouts,
    lifetimePRs: data.lifetime_prs,
    lifetimeEndurance: data.lifetime_endurance,
    lifetimeTrainingWeeks: data.lifetime_training_weeks,
    currentStreak: data.current_streak,
    bestStreak: data.best_streak,
    unlockedAchievements: [],
  };
}

export async function getCharacter(): Promise<Character | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error || !data) return null;

  // Charger les succès débloqués
  const { data: unlockedData } = await supabase
    .from("user_achievements")
    .select("achievement_id, unlocked_at")
    .eq("user_id", user.id);

  const unlockedAchievements = (unlockedData ?? []).map((u) => ({
    achievementId: u.achievement_id,
    unlockedAt: u.unlocked_at,
  }));

  return {
    ...mapCharacter(data),
    unlockedAchievements,
  };
}

export async function saveCharacter(character: Character): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("characters").upsert({
    id: character.id,
    user_id: user.id,
    name: character.name,
    level: character.level,
    xp: character.xp,
    gold: character.gold,
    strength: character.strength,
    endurance: character.endurance,
    vitality: character.vitality,
    discipline: character.discipline,
    lifetime_volume: character.lifetimeVolume,
    lifetime_distance: character.lifetimeDistance,
    lifetime_workouts: character.lifetimeWorkouts,
    lifetime_prs: character.lifetimePRs,
    lifetime_endurance: character.lifetimeEndurance,
    lifetime_training_weeks: character.lifetimeTrainingWeeks,
    current_streak: character.currentStreak,
    best_streak: character.bestStreak,
  });
}

export async function createCharacter(name: string): Promise<Character | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("characters")
    .insert({
      user_id: user.id,
      name: name,
      level: 1,
      xp: 0,
      gold: 0,
      strength: 0,
      endurance: 0,
      vitality: 0,
      discipline: 0,
      lifetime_volume: 0,
      lifetime_distance: 0,
      lifetime_workouts: 0,
      lifetime_prs: 0,
      lifetime_endurance: 0,
      lifetime_training_weeks: 0,
      current_streak: 0,
      best_streak: 0,
    })
    .select()
    .single();

  if (error || !data) return null;
  return mapCharacter(data);
}
