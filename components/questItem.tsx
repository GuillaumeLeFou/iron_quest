import { getQuestStatus } from "@/models/quest";
import { Quest } from "@/types/quest";
import { Text, View } from "react-native";

interface QuestItemProps {
  quest: Quest;
}

export function QuestItem({ quest }: QuestItemProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text> {quest.title} </Text>
      <Text> {quest.description} </Text>
      <Text>
        {" "}
        {quest.progression} / {quest.goal}{" "}
      </Text>
      <Text>{getQuestStatus(quest)}</Text>
    </View>
  );
}
