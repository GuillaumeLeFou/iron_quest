import { Label } from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export function BackButton() {
  function handlePress() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Label color={Colors.primary}>←</Label>

      <Label color={Colors.primary}>Retour</Label>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",

    gap: Spacing.sm,

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,

    backgroundColor: Colors.card,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ translateY: 1 }],
  },
});
