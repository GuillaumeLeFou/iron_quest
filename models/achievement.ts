import { Achievement, AchievementCategory } from "@/types/achievement";
import { Character } from "@/types/character";

function checkSpecialAchievement(
  character: Character,
  achievementId: string,
): boolean {
  switch (achievementId) {
    case "special_first_workout":
      return character.lifetimeWorkouts >= 1;

    case "special_first_pr":
      return character.lifetimePRs >= 1;

    default:
      return false;
  }
}

export function getNewlyUnlockedAchievements(
  character: Character,
  achievements: Achievement[],
): Achievement[] {
  return achievements.filter((achievement) => {
    const alreadyUnlocked = character.unlockedAchievements.some(
      (u) => u.achievementId === achievement.id,
    );

    if (alreadyUnlocked) return false;

    switch (achievement.category) {
      case AchievementCategory.STRENGTH:
        return character.lifetimeVolume >= achievement.objective;

      case AchievementCategory.ENDURANCE:
        return character.lifetimeEndurance >= achievement.objective;

      case AchievementCategory.VITALITY:
        return character.lifetimeWorkouts >= achievement.objective;

      case AchievementCategory.DISCIPLINE:
        return character.lifetimeTrainingWeeks >= achievement.objective;

      case AchievementCategory.LEVEL:
        return character.level >= achievement.objective;

      case AchievementCategory.STREAK:
        return character.bestStreak >= achievement.objective;

      case AchievementCategory.RECORD:
        return character.lifetimePRs >= achievement.objective;

      case AchievementCategory.SPECIAL:
        return checkSpecialAchievement(character, achievement.id);

      default:
        return false;
    }
  });
}
