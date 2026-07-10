import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { CharacterProvider } from "@/context/character";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <CharacterProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#111318",
            },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="workout" />
          <Stack.Screen name="create-character" />
        </Stack>
      </CharacterProvider>

      <StatusBar style="light" />
    </ThemeProvider>
  );
}
