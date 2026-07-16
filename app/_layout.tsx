import { CharacterProvider, useCharacter } from "@/context/character";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import LoadingScreen from "./loadingScreen";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AppContent() {
  const { isLoading } = useCharacter();

  if (isLoading) return <LoadingScreen />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#111318" },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="workout/index" />
      <Stack.Screen name="workout/[id]" />
      <Stack.Screen name="workout/summary" />
      <Stack.Screen name="create-character" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="loadingScreen" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <CharacterProvider>
        <AppContent />
      </CharacterProvider>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
