import { mockCharacter } from "@/mocks/character";
import { getXpPercentage, getXpRequiredForLevel } from "@/models/progression";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const xpPercentage = getXpPercentage(mockCharacter.level, mockCharacter.xp);
  const xpRequired = getXpRequiredForLevel(mockCharacter.level);

  return (
    <View>
      <Text> {mockCharacter.name} </Text>
      <Text> {mockCharacter.level} </Text>
      <Text>
        {" "}
        {mockCharacter.xp} / {xpRequired}{" "}
      </Text>
      <View
        style={{
          backgroundColor: "#ccc",
          height: 20,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: "blue",
            height: "100%",
            width: `${xpPercentage}%`,
          }}
        />
      </View>
    </View>
  );
}
