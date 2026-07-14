import { mockWorkoutSessions, mockWorkoutTemplates } from "@/mocks/workout";
import { WorkoutSession, WorkoutTemplate } from "@/types/workout";

export async function getWorkoutTemplates(): Promise<WorkoutTemplate[]> {
  return Promise.resolve(mockWorkoutTemplates);
}

export async function getWorkoutSessions(): Promise<WorkoutSession[]> {
  return Promise.resolve(mockWorkoutSessions);
}

export async function saveWorkoutSession(
  session: WorkoutSession,
): Promise<void> {}
