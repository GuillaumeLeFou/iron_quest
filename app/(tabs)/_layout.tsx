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
        name="character"
        options={{
          title: "Personnage",
        }}
      />

      <Tabs.Screen
        name="workouts"
        options={{
          title: "Séances",
        }}
      />

      <Tabs.Screen
        name="quests"
        options={{
          title: "Quêtes",
        }}
      />
    </Tabs>
  );
}
