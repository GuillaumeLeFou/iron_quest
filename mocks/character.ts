import { Character } from "@/types/character";

export const mockCharacter: Character = {
  id: "char-1",
  accountId: "account-1",
  name: "PouleGéante",
  level: 4,
  xp: 150,
  gold: 0,
  strength: 12,
  endurance: 8,
  vitality: 10,
  discipline: 7,
  lifetimeVolume: 10,
  unlockedAchievements: [
    {
      achievementId: "vitality_1",
      unlockedAt: "2026-01-01",
    },
  ],
  lifetimeEndurance: 10,
  lifetimeWorkouts: 110,
  lifetimePRs: 5,
  lifetimeDistance: 25,
  lifetimeTrainingWeeks: 0,
  currentStreak: 7,
  bestStreak: 9,
};
