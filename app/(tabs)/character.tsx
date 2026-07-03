import { useCharacter } from "@/context/character";
import { Text, View } from "react-native";

export default function CharacterScreen() {
  const { character } = useCharacter();
  return (
    <View>
      <Text> {character.name} </Text>
      <Text> Avatar </Text>
      <Text> {character.level} </Text>
      <Text> {character.gold} image de pièce d'or </Text>
      <Text> Force : {character.strength} </Text>
      <Text> Endurance : {character.endurance} </Text>
      <Text> Vitalité : {character.vitality} </Text>
      <Text> Discipline : {character.discipline} </Text>
    </View>
  );
}
