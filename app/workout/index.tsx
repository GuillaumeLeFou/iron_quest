import { mockWorkoutTemplates } from "@/mocks/workout";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function WorkoutListScreen() {
  return (
    <View>
      <Text>Liste des séances</Text>
      {mockWorkoutTemplates.map((workout) => (
        <View key={workout.id} style={{ flexDirection: "row" }}>
          <Text onPress={() => router.push(`/workout/${workout.id}`)}>
            {" "}
            {workout.name}{" "}
          </Text>
        </View>
      ))}
    </View>
  );
}
