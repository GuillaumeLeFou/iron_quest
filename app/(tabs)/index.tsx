// import { mockCharacter } from "@/mocks/character";
import { useCharacter } from "@/context/character";
import { mockQuests } from "@/mocks/quest";
import { getXpPercentage, getXpRequiredForLevel } from "@/models/progression";
import { getQuestStatus } from "@/models/quest";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { character } = useCharacter();
  const xpPercentage = getXpPercentage(character.level, character.xp);
  const xpRequired = getXpRequiredForLevel(character.level);
  return (
    <View>
      <Text> {character.name} </Text>
      <Text> {character.level} </Text>
      <Text>
        {" "}
        {character.xp} / {xpRequired}{" "}
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
      <Pressable onPress={() => router.push("/workout")}>
        <Text>Nouvelle séance</Text>
      </Pressable>
    </View>
  );
}
