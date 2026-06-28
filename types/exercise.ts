export type Equipment =
  | "bodyweight"
  | "barbell"
  | "dumbbell"
  | "kettlebell"
  | "machine"
  | "cable"
  | "resistance_band";

interface BaseExercise {
  id: string;
  name: string;
  description: string;
}

export interface StrengthExercise extends BaseExercise {
  equipment: Equipment;
  allowsAddedWeight?: boolean;
}

export interface CardioExercise extends BaseExercise {
  trackDistance: boolean;
}

export type Exercise = StrengthExercise | CardioExercise;
