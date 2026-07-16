import { Label } from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { Pressable, StyleSheet, View } from "react-native";

type PrimaryButtonProps = {
  title: string;
  subtitle?: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({
  title,
  subtitle,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <View style={styles.content}>
        <Label style={styles.title}>{title}</Label>

        {subtitle ? (
          <Label muted style={styles.subtitle}>
            {subtitle}
          </Label>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    backgroundColor: Colors.surface,
    borderWidth: Border.thin,
    borderColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    justifyContent: "center",
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ translateY: 2 }],
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: Colors.primary,
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
  },

  subtitle: {
    marginTop: Spacing.xs,
    textAlign: "center",
  },
});
