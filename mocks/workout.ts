import { WorkoutSession, WorkoutTemplate } from "@/types/workout";

export const mockWorkoutTemplates: WorkoutTemplate[] = [
  {
    id: "template-1",
    name: "Séance haut du corps",
    exerciseIds: ["exercise-1", "exercise-2"],
  },
  {
    id: "template-2",
    name: "Cardio",
    exerciseIds: ["exercise-3", "exercise-4"],
  },
  {
    id: "template-3",
    name: "Séance complète",
    exerciseIds: ["exercise-1", "exercise-2", "exercise-3", "exercise-4"],
  },
];

export const mockWorkoutSessions: WorkoutSession[] = [
  {
    id: "session-1",
    templateId: "template-1",
    date: "2026-06-24",
    duration: 3600,
    notes: "Bonne séance, pompes assez faciles.",
    exercises: [
      {
        type: "strength",
        exerciseId: "exercise-1",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 9 },
        ],
      },
      {
        type: "strength",
        exerciseId: "exercise-2",
        sets: [
          { weight: 10, reps: 12 },
          { weight: 10, reps: 10 },
          { weight: 10, reps: 8 },
        ],
      },
    ],
  },
  {
    id: "session-2",
    templateId: "template-2",
    date: "2026-06-26",
    duration: 2400,
    notes: "Cardio léger.",
    exercises: [
      {
        type: "cardio",
        exerciseId: "exercise-3",
        distance: 5,
        duration: 1800,
      },
      {
        type: "cardio",
        exerciseId: "exercise-4",
        duration: 600,
      },
      {
        type: "cardio",
        exerciseId: "exercise-3",
        distance: 2,
        duration: 300,
      },
    ],
  },
  {
    id: "session-3",
    templateId: "template-1",
    date: "2026-06-29",
    duration: 3900,
    notes: "Progression sur le curl.",
    exercises: [
      {
        type: "strength",
        exerciseId: "exercise-1",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        type: "strength",
        exerciseId: "exercise-2",
        sets: [
          { weight: 12, reps: 10 },
          { weight: 12, reps: 9 },
          { weight: 12, reps: 8 },
        ],
      },
    ],
  },
];
