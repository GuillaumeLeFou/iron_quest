import { LevelUpResult } from "@/types/progression";
export function getXpRequiredForLevel(level: number): number {
  if (level < 1) {
    throw new Error("Level must be at least 1, received: " + level);
  }

  return 100 + level * 50;
}

export function getNewLevel(level: number, xp: number): LevelUpResult {
  while (xp >= getXpRequiredForLevel(level)) {
    xp = xp - getXpRequiredForLevel(level);
    level++;
  }

  return { newLevel: level, remainingXp: xp };
}

export function getXpPercentage(level: number, xp: number): number {
  const xpRequired = getXpRequiredForLevel(level);
  const percentage = (xp / xpRequired) * 100;

  if (percentage > 100) {
    return 100;
  }

  return percentage;
}
