import { mockExercises } from "@/mocks/exercise";
import { mockWorkoutSessions, mockWorkoutTemplates } from "@/mocks/workout";
import { getLastPerformance } from "@/models/workout";
import { saveCurrentSession } from "@/services/session";
import { SetEntry, WorkoutSession } from "@/types/workout";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

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

  function handleSessionComplete() {
    if (!workout) return;
    const session: WorkoutSession = {
      id: Date.now().toString(),
      templateId: workout.id,
      date: new Date().toISOString(),
      duration: 0,
      notes: "",
      exercises: Object.entries(sets).map(([exerciseId, exerciseSets]) => ({
        type: "strength" as const,
        exerciseId,
        sets: exerciseSets,
      })),
    };

    saveCurrentSession(session);
    router.push("/workout/summary");
  }

  if (!workout) {
    return (
      <View>
        <Text>Séance introuvable</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Séance en cours</Text>
      <Text> {workout.name} </Text>
      {exercises.map((exercise) => (
        <View key={exercise.id}>
          <View style={{ flexDirection: "row" }}>
            <Text> {exercise.name} </Text>
            <Pressable
              onPress={() =>
                setSets({
                  ...sets,
                  [exercise.id]: [...sets[exercise.id], { weight: 0, reps: 0 }],
                })
              }
            >
              <Text> Ajouter une série</Text>
            </Pressable>
          </View>
          {sets[exercise.id].map((set, index) => (
            <View key={index}>
              {
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    value={String(sets[exercise.id][index].weight)}
                    onChangeText={(text) => {
                      setSets({
                        ...sets,
                        [exercise.id]: sets[exercise.id].map((s, i) =>
                          i === index ? { ...s, weight: Number(text) } : s,
                        ),
                      });
                    }}
                    keyboardType="numeric"
                  />
                  <TextInput
                    value={String(sets[exercise.id][index].reps)}
                    onChangeText={(text) => {
                      setSets({
                        ...sets,
                        [exercise.id]: sets[exercise.id].map((s, i) =>
                          i === index ? { ...s, reps: Number(text) } : s,
                        ),
                      });
                    }}
                    keyboardType="numeric"
                  />
                  <Pressable
                    onPress={() =>
                      setSets({
                        ...sets,
                        [exercise.id]: sets[exercise.id].filter(
                          (_, i) => i !== index,
                        ),
                      })
                    }
                    disabled={sets[exercise.id].length === 1}
                  >
                    <Text>Supprimer la série</Text>
                  </Pressable>
                </View>
              }
            </View>
          ))}
        </View>
      ))}
      <Pressable onPress={handleSessionComplete}>
        <Text>Valider la séance</Text>
      </Pressable>
    </View>
  );
}
