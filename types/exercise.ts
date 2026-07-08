export type Equipment =
  | "bodyweight"
  | "barbell"
  | "dumbbell"
  | "kettlebell"
  | "machine"
  | "cable"
  | "resistance_band";

export enum EnduranceIntensity {
  VERY_LOW = 0.3,
  LOW = 0.8,
  MEDIUM = 1.5,
  HIGH = 2.0,
  VERY_HIGH = 3.0,
}

export enum DistanceMultiplier {
  NONE = 0,
  VERY_LOW = 0.25,
  LOW = 0.5,
  MEDIUM = 1,
  HIGH = 1.5,
  VERY_HIGH = 2,
}

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
  enduranceCoefficient: EnduranceIntensity;
  distanceMultiplier: DistanceMultiplier;
}

export type Exercise = StrengthExercise | CardioExercise;
