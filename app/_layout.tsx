import { CharacterProvider, useCharacter } from "@/context/character";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AppContent() {
  const { isLoading } = useCharacter();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
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
