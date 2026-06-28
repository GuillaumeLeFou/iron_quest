export interface WorkoutTemplate {
  id: string;
  name: string;
  exerciseIds: string[];
}

interface SetEntry {
  weight: number;
  reps: number;
}

export interface WorkoutSession {
  id: string;
  templateId: string;
  date: string;
  duration: number; // en secondes
  notes: string;
  exercises: LoggedExercise[];
}

interface LoggedStrengthExercise {
  type: "strength";
  exerciseId: string;
  sets: SetEntry[];
}

interface LoggedCardioExercise {
  type: "cardio";
  exerciseId: string;
  distance?: number;
  duration: number; // en secondes
}

export type LoggedExercise = LoggedStrengthExercise | LoggedCardioExercise;
