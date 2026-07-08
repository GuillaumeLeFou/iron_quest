import { useCharacter } from "@/context/character";
import React from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const { character } = useCharacter();
  return (
    <View>
      <Text>Iron Quest - Profile</Text>
      <Text> {character.name} </Text>
      <Text> Avatar </Text>
      <Text> {character.level} </Text>
      <Text> {character.gold} image de pièce d'or </Text>
      <Text> Force : {character.strength} </Text>
      <Text> Endurance : {character.endurance} </Text>
      <Text> Vitalité : {character.vitality} </Text>
      <Text> Discipline : {character.discipline} </Text>
      <Text> {character.lifetimeDistance} km </Text>
      <Text> {character.lifetimeEndurance} endurance </Text>
      <Text> {character.lifetimePRs} nbr pr </Text>
      <Text> {character.lifetimeTrainingWeeks} nbr semaines </Text>
      <Text> {character.lifetimeVolume} kg soulevé </Text>
      <Text> {character.lifetimeWorkouts} nbr séance </Text>
    </View>
  );
}
