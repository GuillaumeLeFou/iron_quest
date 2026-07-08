import { UnlockedAchievement } from "./achievement";

export interface Character {
  id: string;
  accountId: string;
  name: string;
  level: number;
  xp: number;
  gold: number;

  strength: number;
  endurance: number;
  vitality: number;
  discipline: number;

  lifetimeVolume: number;
  lifetimeEndurance: number;
  lifetimeWorkouts: number;
  lifetimePRs: number;
  lifetimeDistance: number;

  lifetimeTrainingWeeks: number;
  currentStreak: number;
  bestStreak: number;

  unlockedAchievements: UnlockedAchievement[];
}
