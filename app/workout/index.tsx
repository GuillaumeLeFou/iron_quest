import { mockWorkoutSessions, mockWorkoutTemplates } from "@/mocks/workout";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function WorkoutListScreen() {
  return (
    <View>
      <Text>Liste des séances</Text>
      {mockWorkoutTemplates.map((workout) => (
        <View key={workout.id} style={{ flexDirection: "row" }}>
          <Pressable onPress={() => router.push(`/workout/${workout.id}`)}>
            <Text> {workout.name} </Text>
          </Pressable>
        </View>
      ))}
      <Text>HISTORIQUE</Text>
      {mockWorkoutSessions.map((workout) => (
        <View key={workout.id}>
          <Text>
            {" "}
            {workout.date} / {Math.floor(workout.duration / 60)} minutes{" "}
          </Text>
          <Text>{workout.notes}</Text>
          {workout.exercises.map((ex) => (
            <View key={ex.exerciseId}>
              <Text>{ex.type}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
