import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
        }}
      />

      <Tabs.Screen
        name="quests"
        options={{
          title: "Quêtes",
        }}
      />

      <Tabs.Screen
        name="achievements"
        options={{
          title: "Succès",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
        }}
      />
    </Tabs>
  );
}
