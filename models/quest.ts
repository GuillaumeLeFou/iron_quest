import { Quest, QuestStatus } from "@/types/quest";

export function getQuestStatus(quest: Quest): QuestStatus {
  if (quest.progression === 0) {
    return "not_started";
  }
  if (quest.progression >= quest.goal) {
    return "completed";
  }
  return "in_progress";
}
