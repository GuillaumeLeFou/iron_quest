import { SetEntry, WorkoutSession } from "@/types/workout";

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

export function getLastPerformance(
  exerciseId: string,
  sessions: WorkoutSession[],
): SetEntry[] | null {
  const sorted_sessions = [...sessions].sort((a, b) =>
    a.date > b.date ? -1 : 1,
  );
  for (const session of sorted_sessions) {
    for (const exercise of session.exercises) {
      if (exercise.type === "strength" && exercise.exerciseId === exerciseId) {
        return exercise.sets;
      }
    }
  }
  return null;
}

export function getTotalVolume(sessions: WorkoutSession[]): number {
  let total = 0;
  for (const session of sessions) {
    for (const exercise of session.exercises) {
      if (exercise.type === "strength") {
        for (const set of exercise.sets) {
          total += set.reps * set.weight;
        }
      }
    }
  }
  return total;
}
