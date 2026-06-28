import { mockCharacter } from "@/mocks/character";
import { mockQuests } from "@/mocks/quest";
import { getXpPercentage, getXpRequiredForLevel } from "@/models/progression";
import { getQuestStatus } from "@/models/quest";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const xpPercentage = getXpPercentage(mockCharacter.level, mockCharacter.xp);
  const xpRequired = getXpRequiredForLevel(mockCharacter.level);
  console.log(mockQuests);
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
      {mockQuests.map((quest) => (
        <View key={quest.id} style={{ flexDirection: "row" }}>
          <Text> {quest.title} </Text>
          <Text> {quest.description} </Text>
          <Text>
            {" "}
            {quest.progression} / {quest.goal}{" "}
          </Text>
          <Text> {getQuestStatus(quest)} </Text>
        </View>
      ))}
    </View>
  );
}
