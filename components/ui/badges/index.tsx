import { Label } from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type BadgeVariant =
  "default" | "primary" | "success" | "warning" | "danger" | "info";

type BadgeProps = PropsWithChildren<{
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
}>;

const badgeColors: Record<
  BadgeVariant,
  {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  }
> = {
  default: {
    backgroundColor: Colors.cardSoft,
    borderColor: Colors.border,
    textColor: Colors.textMuted,
  },

  primary: {
    backgroundColor: Colors.primarySoft,
    borderColor: Colors.primary,
    textColor: Colors.primary,
  },

  success: {
    backgroundColor: "#153624",
    borderColor: Colors.success,
    textColor: Colors.success,
  },

  warning: {
    backgroundColor: "#3A2A13",
    borderColor: Colors.warning,
    textColor: Colors.warning,
  },

  danger: {
    backgroundColor: "#351719",
    borderColor: Colors.danger,
    textColor: Colors.danger,
  },

  info: {
    backgroundColor: "#18283F",
    borderColor: Colors.info,
    textColor: Colors.info,
  },
};

export function Badge({ children, variant = "default", style }: BadgeProps) {
  const colors = badgeColors[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
        },
        style,
      ]}
    >
      <Label
        style={[
          styles.text,
          {
            color: colors.textColor,
          },
        ]}
      >
        {children}
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderWidth: Border.thin,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },

  text: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
});
