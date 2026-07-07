export enum AchievementRarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

export enum AchievementCategory {
  STRENGTH = "strength",
  ENDURANCE = "endurance",
  VITALITY = "vitality",
  DISCIPLINE = "discipline",
  LEVEL = "level",
  STREAK = "streak",
  RECORD = "record",
  SPECIAL = "special",
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  objective: number;
}
