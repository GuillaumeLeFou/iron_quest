import { WorkoutSession } from "@/types/workout";

export function getEstimatedOneRepMax(weight: number, reps: number): number {
  return weight * (1 + reps / 30);
}

export function isNewPersonalRecord(
  weight: number,
  reps: number,
  currentRecord: number,
): boolean {
  return getEstimatedOneRepMax(weight, reps) > currentRecord;
}

export function getBestOneRepMax(
  exerciseId: string,
  sessions: WorkoutSession[],
): number {
  let best = 0;
  for (let session of sessions) {
    for (let exercise of session.exercises) {
      if (exercise.type === "strength" && exercise.exerciseId === exerciseId) {
        for (let set of exercise.sets) {
          let estimateOneRep = getEstimatedOneRepMax(set.weight, set.reps);
          if (estimateOneRep > best) {
            best = estimateOneRep;
          }
        }
      }
    }
  }
  return best;
}
