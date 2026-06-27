export type QuestStatus = "not_started" | "in_progress" | "completed";

export interface Quest {
  id: string;
  title: string;
  description: string;
  progression: number;
  goal: number;
}
