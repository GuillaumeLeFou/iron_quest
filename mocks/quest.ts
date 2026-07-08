import { Quest } from "@/types/quest";

export const mockQuests: Quest[] = [
  {
    id: "quest-1",
    title: "Pompes",
    description: "Faire 10 pompes",
    progression: 0,
    goal: 10,
    type: "daily",
  },
  {
    id: "quest-2",
    title: "Abdo",
    description: "Faire 1 séance abdo",
    progression: 1,
    goal: 1,
    type: "daily",
  },
  {
    id: "quest-3",
    title: "Courses",
    description: "Faire 2km",
    progression: 1.2,
    goal: 2,
    type: "weekly",
  },
];
