import { useCharacter } from "@/context/character";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function CreateCharacter() {
  const { updateName } = useCharacter();
  const [name, setName] = useState<string>("");
  return (
    <View>
      <Text>Iron Quest - Create character</Text>
      <Text>Veuillez entrer votre nom:</Text>{" "}
      <TextInput onChangeText={setName} />
      <View
        style={{
          width: 80,
          height: 80,
          backgroundColor: "#888",
          borderRadius: 8,
        }}
      >
        <Text>?</Text>
      </View>
      <Pressable
        onPress={() => {
          updateName(name);
          router.replace("/");
        }}
        disabled={name.trim() === ""}
      >
        <Text>Commencer l'aventure</Text>
      </Pressable>
    </View>
  );
}
