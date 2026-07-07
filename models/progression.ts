import { Exercise } from "@/types/exercise";
import { LevelUpResult } from "@/types/progression";
import { WorkoutSession } from "@/types/workout";
import {
  getCompletedTrainingWeeks,
  getDaysSinceLastWorkout,
} from "@/utils/date";
import { getTotalVolume } from "./workout";

const MAX_STAT = 100;

function calculateStatProgression(
  score: number,
  progressionScale: number,
): number {
  return Math.round(MAX_STAT * (1 - Math.exp(-score / progressionScale)));
}

export function getXpRequiredForLevel(level: number): number {
  if (level < 1) {
    throw new Error("Level must be at least 1, received: " + level);
  }

  return 100 + level * 50;
}

export function getNewLevel(level: number, xp: number): LevelUpResult {
  while (xp >= getXpRequiredForLevel(level)) {
    xp = xp - getXpRequiredForLevel(level);
    level++;
  }

  return { newLevel: level, remainingXp: xp };
}

export function getXpPercentage(level: number, xp: number): number {
  const xpRequired = getXpRequiredForLevel(level);
  const percentage = (xp / xpRequired) * 100;

  if (percentage > 100) {
    return 100;
  }

  return percentage;
}

export function calculateStrength(sessions: WorkoutSession[]): number {
  const volume = getTotalVolume(sessions);

  const FORCE_PROGRESSION_SCALE = 3_000_000;

  return calculateStatProgression(volume, FORCE_PROGRESSION_SCALE);
}

export function calculateEndurance(
  sessions: WorkoutSession[],
  exercises: Exercise[],
): number {
  let enduranceScore = 0;

  for (const session of sessions) {
    for (const loggedExercise of session.exercises) {
      if (loggedExercise.type !== "cardio") {
        continue;
      }

      const exercise = exercises.find(
        (e) => e.id === loggedExercise.exerciseId,
      );

      if (!exercise || !("enduranceCoefficient" in exercise)) {
        continue;
      }

      const durationMinutes = loggedExercise.duration / 60;

      const durationPoints = durationMinutes * exercise.enduranceCoefficient;

      let distancePoints = 0;

      if (exercise.trackDistance && loggedExercise.distance !== undefined) {
        distancePoints = loggedExercise.distance * exercise.distanceMultiplier;
      }

      enduranceScore += durationPoints + distancePoints;
    }
  }

  const ENDURANCE_PROGRESSION_SCALE = 15_000;

  return calculateStatProgression(enduranceScore, ENDURANCE_PROGRESSION_SCALE);
}

export function calculateVitality(sessions: WorkoutSession[]): number {
  const completedSessions = sessions.length;

  const VITALITY_PROGRESSION_SCALE = 300;

  return calculateStatProgression(
    completedSessions,
    VITALITY_PROGRESSION_SCALE,
  );
}

export function calculateDiscipline(sessions: WorkoutSession[]): number {
  const trainingWeeks = getCompletedTrainingWeeks(sessions);

  const DISCIPLINE_PROGRESSION_SCALE = 52;

  return calculateStatProgression(trainingWeeks, DISCIPLINE_PROGRESSION_SCALE);
}

export function applyStrengthDecay(
  strength: number,
  sessions: WorkoutSession[],
): number {
  const daysInactive = getDaysSinceLastWorkout(sessions);

  return applyDecay(strength, daysInactive, 30, 0.01);
}

export function applyEnduranceDecay(
  endurance: number,
  sessions: WorkoutSession[],
): number {
  const daysInactive = getDaysSinceLastWorkout(sessions);

  return applyDecay(endurance, daysInactive, 14, 0.03);
}

export function applyVitalityDecay(
  vitality: number,
  sessions: WorkoutSession[],
): number {
  const daysInactive = getDaysSinceLastWorkout(sessions);

  return applyDecay(vitality, daysInactive, 7, 0.05);
}

export function applyDisciplineDecay(
  discipline: number,
  sessions: WorkoutSession[],
): number {
  const daysInactive = getDaysSinceLastWorkout(sessions);

  const inactiveWeeks = Math.floor(daysInactive / 7);

  if (inactiveWeeks <= 2) {
    return discipline;
  }

  return Math.max(0, discipline - (inactiveWeeks - 2));
}

export function applyDecay(
  stat: number,
  daysInactive: number,
  gracePeriod: number,
  monthlyDecay: number,
): number {
  if (daysInactive <= gracePeriod) {
    return stat;
  }

  const inactiveMonths = (daysInactive - gracePeriod) / 30;

  return Math.round(stat * Math.pow(1 - monthlyDecay, inactiveMonths));
}
