import { mockExercises } from "@/mocks/exercise";
import { mockWorkoutSessions, mockWorkoutTemplates } from "@/mocks/workout";
import { getLastPerformance } from "@/models/workout";
import { SetEntry } from "@/types/workout";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  const workout = mockWorkoutTemplates.find((workout) => workout.id === id);
  const exercises = mockExercises.filter((ex) =>
    workout?.exerciseIds.includes(ex.id),
  );
  const initialSets: Record<string, SetEntry[]> = {};
  for (const exercise of exercises) {
    const lastPerf = getLastPerformance(exercise.id, mockWorkoutSessions);
    initialSets[exercise.id] = lastPerf ?? [{ weight: 0, reps: 0 }];
  }

  const [sets, setSets] = useState<Record<string, SetEntry[]>>(initialSets);
  if (!workout) {
    return (
      <View>
        <Text>Séance introuvable</Text>
      </View>
    );
  }
  console.log("sets initiaux :", JSON.stringify(sets, null, 2));
  return (
    <View>
      <Text>Séance en cours</Text>
      <Text> {workout.name} </Text>
      {exercises.map((exercise) => (
        <View key={exercise.id}>
          <Text> {exercise.name} </Text>
        </View>
      ))}
    </View>
  );
}
