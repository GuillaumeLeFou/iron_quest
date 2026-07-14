import { mockAchievements } from "@/mocks/achievement";
import { Achievement } from "@/types/achievement";

export async function getAchievements(): Promise<Achievement[]> {
  return Promise.resolve(mockAchievements);
}
