import { mockQuests } from "@/mocks/quest";
import { Quest } from "@/types/quest";

export async function getQuests(): Promise<Quest[]> {
  return Promise.resolve(mockQuests);
}
