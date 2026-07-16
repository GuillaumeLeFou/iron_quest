import { Body, Label, Title } from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Label color={Colors.background} style={styles.logoText}>
            IQ
          </Label>
        </View>

        <Title style={styles.title}>Iron Quest</Title>

        <Body muted style={styles.subtitle}>
          Le camp se prépare...
        </Body>

        <View style={styles.loadingTrack}>
          <View style={styles.loadingFill} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
  },

  content: {
    width: "100%",
    alignItems: "center",
  },

  logo: {
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
    borderWidth: Border.normal,
    borderColor: Colors.primary,
    borderRadius: Radius.xl,
  },

  logoText: {
    color: Colors.primary,
    fontSize: 28,
    lineHeight: 34,
  },

  title: {
    marginTop: Spacing.xl,
    textAlign: "center",
  },

  subtitle: {
    marginTop: Spacing.sm,
    textAlign: "center",
  },

  loadingTrack: {
    width: 180,
    height: 6,
    marginTop: Spacing.xl,
    overflow: "hidden",
    backgroundColor: Colors.cardSoft,
    borderRadius: Radius.pill,
  },

  loadingFill: {
    width: "45%",
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
  },
});
