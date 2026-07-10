import { Border, Colors, Radius } from "@/constants/theme";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ProgressBarProps = {
  value: number;
  color?: string;
  trackColor?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export function ProgressBar({
  value,
  color = Colors.primary,
  trackColor = Colors.cardSoft,
  height = 10,
  style,
}: ProgressBarProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: trackColor,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${normalizedValue}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
    borderRadius: Radius.pill,
    borderWidth: Border.thin,
    borderColor: Colors.border,
  },

  fill: {
    height: "100%",
    borderRadius: Radius.pill,
  },
});
