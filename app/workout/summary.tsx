import { mockWorkoutSessions } from "@/mocks/workout";
import { getBestOneRepMax, isNewPersonalRecord } from "@/models/workout";
import { getCurrentSession } from "@/services/session";
import { WorkoutSession } from "@/types/workout";
import { Text, View } from "react-native";

export default function Summary() {
  const last_session = getCurrentSession();

  function calculatedResults(session: WorkoutSession): {
    xpGained: number;
    prs: number;
  } {
    let bonus_pr = 0;
    let pr = 0;

    for (const exercise of session.exercises) {
      if (exercise.type === "strength") {
        for (const set of exercise.sets) {
          if (
            isNewPersonalRecord(
              set.weight,
              set.reps,
              getBestOneRepMax(exercise.exerciseId, mockWorkoutSessions),
            )
          ) {
            bonus_pr += 25;
            pr += 1;
          }
        }
      }
    }

    return { xpGained: 50 + bonus_pr, prs: pr };
  }

  const results = last_session
    ? calculatedResults(last_session)
    : { xpGained: 0, prs: 0 };

  return (
    <View>
      <Text>Résumé</Text>
      <Text>XP: {results.xpGained}</Text>
      <Text>PRs: {results.prs}</Text>
      <Text>
        Un PR est battu uniquement si ton 1RM estimé dépasse ton record
        précédent.
      </Text>
    </View>
  );
}
