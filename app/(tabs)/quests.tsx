import { QuestItem } from "@/components/questItem";
import { mockQuests } from "@/mocks/quest";
import { Text, View } from "react-native";

export default function QuestScreen() {
  const dailyQuests = mockQuests.filter((quest) => quest.type === "daily");
  const weeklyQuests = mockQuests.filter((quest) => quest.type === "weekly");
  return (
    <View>
      <Text>Iron Quest - Quest</Text>
      {dailyQuests.map((quest) => (
        <QuestItem key={quest.id} quest={quest} />
      ))}
      {weeklyQuests.map((quest) => (
        <QuestItem key={quest.id} quest={quest} />
      ))}
    </View>
  );
}
