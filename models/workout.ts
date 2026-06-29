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
