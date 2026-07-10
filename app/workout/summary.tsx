import { PrimaryButton } from "@/components/ui/buttons";
import { Card } from "@/components/ui/cards";
import { Page } from "@/components/ui/layout";
import {
  Body,
  Caption,
  Heading,
  Label,
  Title,
} from "@/components/ui/typography";
import { Colors, Spacing } from "@/constants/theme";
import { useCharacter } from "@/context/character";
import { mockWorkoutSessions } from "@/mocks/workout";
import { getBestOneRepMax, isNewPersonalRecord } from "@/models/workout";
import { getCurrentSession } from "@/services/session";
import { WorkoutSession } from "@/types/workout";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function Summary() {
  const { completeSession } = useCharacter();

  const lastSession = getCurrentSession();

  function calculateResults(session: WorkoutSession): {
    xpGained: number;
    prs: number;
  } {
    let personalRecords = 0;

    for (const exercise of session.exercises) {
      if (exercise.type !== "strength") continue;

      for (const set of exercise.sets) {
        const previousBestOneRepMax = getBestOneRepMax(
          exercise.exerciseId,
          mockWorkoutSessions,
        );

        if (isNewPersonalRecord(set.weight, set.reps, previousBestOneRepMax)) {
          personalRecords += 1;
        }
      }
    }

    return {
      xpGained: 50 + personalRecords * 25,
      prs: personalRecords,
    };
  }

  const results = lastSession
    ? calculateResults(lastSession)
    : {
        xpGained: 0,
        prs: 0,
      };

  useEffect(() => {
    if (!lastSession) return;

    completeSession(
      lastSession,

      // TODO: remplacer par le vrai historique joueur
      mockWorkoutSessions,

      // TODO: remplacer par les vrais exercices
      [],

      results.xpGained,
      results.prs,
    );
  }, []);

  return (
    <Page scroll={false} contentStyle={styles.content}>
      <View>
        <Title>Retour au camp</Title>

        <Body muted style={styles.pageSubtitle}>
          Ta séance est terminée
        </Body>

        <Card style={styles.rewardPanel}>
          <Label style={styles.rewardIcon}>🔥</Label>

          <Heading style={styles.rewardTitle}>Le feu grandit</Heading>

          <Body muted style={styles.rewardText}>
            Ton effort renforce le camp et prépare la prochaine expédition.
          </Body>
        </Card>

        <View style={styles.resultGrid}>
          <Card style={styles.resultCard}>
            <Heading color={Colors.primary} style={styles.resultValue}>
              +{results.xpGained}
            </Heading>

            <Caption style={styles.resultLabel}>XP gagné</Caption>
          </Card>

          <Card style={styles.resultCard}>
            <Heading color={Colors.primary} style={styles.resultValue}>
              {results.prs}
            </Heading>

            <Caption style={styles.resultLabel}>PR battus</Caption>
          </Card>
        </View>

        <Card style={styles.infoPanel}>
          <Heading style={styles.infoTitle}>Règle des records</Heading>

          <Body muted style={styles.infoText}>
            Un PR est battu uniquement si ton 1RM estimé dépasse ton record
            précédent.
          </Body>
        </Card>
      </View>

      <PrimaryButton
        title="Retour au camp"
        subtitle="Découvrir ta progression"
        onPress={() => router.replace("/")}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "space-between",
    paddingBottom: Spacing.xl,
  },

  pageSubtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },

  rewardPanel: {
    alignItems: "center",
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.xl,
  },

  rewardIcon: {
    fontSize: 46,
    lineHeight: 54,
  },

  rewardTitle: {
    marginTop: Spacing.sm,
    textAlign: "center",
  },

  rewardText: {
    marginTop: Spacing.sm,
    textAlign: "center",
  },

  resultGrid: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },

  resultCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },

  resultValue: {
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
  },

  resultLabel: {
    marginTop: Spacing.sm,
    textAlign: "center",
  },

  infoPanel: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.surface,
  },

  infoTitle: {
    fontSize: 16,
    lineHeight: 22,
  },

  infoText: {
    marginTop: Spacing.sm,
  },
});
