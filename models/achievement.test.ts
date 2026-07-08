import {
  Achievement,
  AchievementCategory,
  AchievementRarity,
} from "@/types/achievement";
import { Character } from "@/types/character";
import { getNewlyUnlockedAchievements } from "./achievement";

function createTestCharacter(overrides: Partial<Character> = {}): Character {
  return {
    level: 1,
    lifetimeVolume: 0,
    lifetimeEndurance: 0,
    lifetimeWorkouts: 0,
    lifetimeTrainingWeeks: 0,
    bestStreak: 0,
    lifetimePRs: 0,
    unlockedAchievements: [],
    ...overrides,
  } as Character;
}

function createAchievement(
  category: AchievementCategory,
  objective: number,
  id = "achievement-1",
): Achievement {
  return {
    id,
    name: "Test achievement",
    description: "Test achievement description",
    category,
    rarity: AchievementRarity.COMMON,
    objective,
  };
}

describe("getNewlyUnlockedAchievements", () => {
  it("should return empty array when no achievement is completed", () => {
    const character = createTestCharacter();

    const achievements = [
      createAchievement(AchievementCategory.STRENGTH, 1000),
    ];

    expect(getNewlyUnlockedAchievements(character, achievements)).toEqual([]);
  });

  it("should unlock strength achievement when volume objective is reached", () => {
    const character = createTestCharacter({
      lifetimeVolume: 5000,
    });

    const achievements = [
      createAchievement(AchievementCategory.STRENGTH, 5000),
    ];

    expect(getNewlyUnlockedAchievements(character, achievements)).toHaveLength(
      1,
    );
  });

  it("should unlock endurance achievement when endurance objective is reached", () => {
    const character = createTestCharacter({
      lifetimeEndurance: 300,
    });

    const achievements = [
      createAchievement(AchievementCategory.ENDURANCE, 300),
    ];

    expect(getNewlyUnlockedAchievements(character, achievements)).toHaveLength(
      1,
    );
  });

  it("should unlock vitality achievement when workout objective is reached", () => {
    const character = createTestCharacter({
      lifetimeWorkouts: 50,
    });

    const achievements = [createAchievement(AchievementCategory.VITALITY, 50)];

    expect(getNewlyUnlockedAchievements(character, achievements)).toHaveLength(
      1,
    );
  });

  it("should unlock discipline achievement when training weeks objective is reached", () => {
    const character = createTestCharacter({
      lifetimeTrainingWeeks: 10,
    });

    const achievements = [
      createAchievement(AchievementCategory.DISCIPLINE, 10),
    ];

    expect(getNewlyUnlockedAchievements(character, achievements)).toHaveLength(
      1,
    );
  });

  it("should unlock level achievement when level objective is reached", () => {
    const character = createTestCharacter({
      level: 20,
    });

    const achievements = [createAchievement(AchievementCategory.LEVEL, 20)];

    expect(getNewlyUnlockedAchievements(character, achievements)).toHaveLength(
      1,
    );
  });

  it("should unlock streak achievement when streak objective is reached", () => {
    const character = createTestCharacter({
      bestStreak: 30,
    });

    const achievements = [createAchievement(AchievementCategory.STREAK, 30)];

    expect(getNewlyUnlockedAchievements(character, achievements)).toHaveLength(
      1,
    );
  });

  it("should unlock record achievement when PR objective is reached", () => {
    const character = createTestCharacter({
      lifetimePRs: 5,
    });

    const achievements = [createAchievement(AchievementCategory.RECORD, 5)];

    expect(getNewlyUnlockedAchievements(character, achievements)).toHaveLength(
      1,
    );
  });

  it("should unlock first workout special achievement", () => {
    const character = createTestCharacter({
      lifetimeWorkouts: 1,
    });

    const achievements = [
      createAchievement(
        AchievementCategory.SPECIAL,
        1,
        "special_first_workout",
      ),
    ];

    expect(getNewlyUnlockedAchievements(character, achievements)).toHaveLength(
      1,
    );
  });

  it("should unlock first PR special achievement", () => {
    const character = createTestCharacter({
      lifetimePRs: 1,
    });

    const achievements = [
      createAchievement(AchievementCategory.SPECIAL, 1, "special_first_pr"),
    ];

    expect(getNewlyUnlockedAchievements(character, achievements)).toHaveLength(
      1,
    );
  });

  it("should not return already unlocked achievements", () => {
    const character = createTestCharacter({
      lifetimeVolume: 10000,
      unlockedAchievements: [
        {
          achievementId: "achievement-1",
          unlockedAt: "2026-01-01",
        },
      ],
    });

    const achievements = [createAchievement(AchievementCategory.STRENGTH, 100)];

    expect(getNewlyUnlockedAchievements(character, achievements)).toEqual([]);
  });

  it("should ignore unknown special achievements", () => {
    const character = createTestCharacter({
      lifetimeWorkouts: 100,
    });

    const achievements = [
      createAchievement(AchievementCategory.SPECIAL, 1, "special_unknown"),
    ];

    expect(getNewlyUnlockedAchievements(character, achievements)).toEqual([]);
  });
});
