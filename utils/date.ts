import { WorkoutSession } from "@/types/workout";

export function getWeekNumber(date: Date): number {
  const current = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  const day = current.getUTCDay() || 7;

  current.setUTCDate(current.getUTCDate() + 4 - day);

  const yearStart = new Date(Date.UTC(current.getUTCFullYear(), 0, 1));

  return Math.ceil(
    ((current.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
}

export function getCompletedTrainingWeeks(sessions: WorkoutSession[]): number {
  const weeks = new Set<string>();

  for (const session of sessions) {
    const date = new Date(session.date);

    const year = date.getFullYear();
    const week = getWeekNumber(date);

    weeks.add(`${year}-${week}`);
  }

  return weeks.size;
}

export function getDaysSinceLastWorkout(sessions: WorkoutSession[]): number {
  if (sessions.length === 0) {
    return 0;
  }

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const lastWorkout = new Date(sortedSessions[0].date);
  const today = new Date();

  return Math.floor(
    (today.getTime() - lastWorkout.getTime()) / (1000 * 60 * 60 * 24),
  );
}