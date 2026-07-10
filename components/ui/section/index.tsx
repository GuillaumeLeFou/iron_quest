import { Heading } from "@/components/ui/typography";
import { Spacing } from "@/constants/theme";
import { PropsWithChildren, ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type SectionProps = PropsWithChildren<{
  title?: string;
  action?: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export function Section({
  title,
  action,
  children,
  style,
  contentStyle,
}: SectionProps) {
  return (
    <View style={[styles.section, style]}>
      {(title || action) && (
        <View style={styles.header}>
          {title ? <Heading style={styles.title}>{title}</Heading> : <View />}
          {action}
        </View>
      )}

      <View style={contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.xl,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },

  title: {
    flex: 1,
  },
});
