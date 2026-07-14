import { mockExercises } from "@/mocks/exercise";
import { Exercise } from "@/types/exercise";

export async function getExercises(): Promise<Exercise[]> {
  return Promise.resolve(mockExercises);
}
