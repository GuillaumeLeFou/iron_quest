import { supabase } from "@/lib/supabase";
import { WorkoutSession, WorkoutTemplate } from "@/types/workout";

export async function getWorkoutTemplates(): Promise<WorkoutTemplate[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("workout_templates")
    .select("*, workout_template_exercises(exercise_id, position)")
    .eq("user_id", user.id);

  if (error || !data) return [];

  return data.map((t) => ({
    id: t.id,
    name: t.name,
    exerciseIds: t.workout_template_exercises
      .sort((a, b) => a.position - b.position)
      .map((e) => e.exercise_id),
  }));
}

export async function getWorkoutSessions(): Promise<WorkoutSession[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("workout_sessions")
    .select(
      `
      *,
      logged_exercises (
        *,
        exercise_sets (*),
        cardio_logs (*)
      )
    `,
    )
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error || !data) return [];

  return data.map((session) => ({
    id: session.id,
    templateId: session.template_id ?? "",
    date: session.date,
    duration: session.duration,
    notes: session.notes ?? "",
    exercises: session.logged_exercises.map((ex) => {
      if (ex.type === "strength") {
        return {
          type: "strength" as const,
          exerciseId: ex.exercise_id,
          sets: ex.exercise_sets.map((s) => ({
            weight: s.weight,
            reps: s.reps,
          })),
        };
      } else {
        const cardio = ex.cardio_logs[0];
        return {
          type: "cardio" as const,
          exerciseId: ex.exercise_id,
          duration: cardio?.duration ?? 0,
          distance: cardio?.distance ?? undefined,
        };
      }
    }),
  }));
}

export async function saveWorkoutSession(
  session: WorkoutSession,
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Utilisateur non connecté.");
  }

  const { data: savedSession, error: sessionError } = await supabase
    .from("workout_sessions")
    .insert({
      user_id: user.id,
      template_id: session.templateId || null,
      date: session.date,
      duration: session.duration,
      notes: session.notes || null,
    })
    .select("id")
    .single();

  if (sessionError) {
    throw sessionError;
  }

  try {
    for (let index = 0; index < session.exercises.length; index++) {
      const exercise = session.exercises[index];

      const { data: savedExercise, error: exerciseError } = await supabase
        .from("logged_exercises")
        .insert({
          exercise_id: exercise.exerciseId,
          type: exercise.type,
          session_id: savedSession.id,
        })
        .select("id")
        .single();

      if (exerciseError) {
        throw exerciseError;
      }

      if (exercise.type === "strength") {
        if (exercise.sets.length === 0) {
          continue;
        }

        const setsToInsert = exercise.sets.map((set, setIndex) => ({
          logged_exercise_id: savedExercise.id,
          weight: set.weight,
          reps: set.reps,
          position: setIndex,
        }));

        const { error: setsError } = await supabase
          .from("exercise_sets")
          .insert(setsToInsert);

        if (setsError) {
          throw setsError;
        }

        continue;
      }

      const { error: cardioError } = await supabase.from("cardio_logs").insert({
        logged_exercise_id: savedExercise.id,
        duration: exercise.duration,
        distance: exercise.distance ?? null,
      });

      if (cardioError) {
        throw cardioError;
      }
    }
  } catch (error) {
    await supabase
      .from("workout_sessions")
      .delete()
      .eq("id", savedSession.id)
      .eq("user_id", user.id);

    throw error;
  }
}
