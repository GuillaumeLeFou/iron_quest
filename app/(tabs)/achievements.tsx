import { useCharacter } from "@/context/character";
import { mockAchievements } from "@/mocks/achievement";
import { Text, View } from "react-native";

export default function AchievementScreen() {
  const { character } = useCharacter();
  const achievements = mockAchievements;
  const unlockAchievements = character.unlockedAchievements;

  return (
    <View>
      <Text>Iron Quest - Achievement</Text>
      {achievements.map((ach) => {
        const isUnlocked = unlockAchievements.some(
          (u) => u.achievementId === ach.id,
        );
        return (
          <View key={ach.id}>
            <Text> {ach.name} </Text>
            <Text> {isUnlocked ? "✓ Débloqué" : "🔒 Verrouillé"} </Text>
            <Text> {ach.description} </Text>
            <Text> {ach.objective} </Text>
            <Text> {ach.category} </Text>
            <Text> {ach.rarity} </Text>
          </View>
        );
      })}
    </View>
  );
}
