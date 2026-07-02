// services/session.ts
import { WorkoutSession } from "@/types/workout";

let currentSession: WorkoutSession | null = null;

export function saveCurrentSession(session: WorkoutSession) {
  currentSession = session;
}

export function getCurrentSession(): WorkoutSession | null {
  return currentSession;
}
