import { Border, Colors, Radius, Shadows, Spacing } from "@/constants/theme";
import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.card,
  },
});
