import { Card } from "@/components/ui/cards";
import { Page } from "@/components/ui/layout";
import { Section } from "@/components/ui/section";
import {
  Body,
  Caption,
  Heading,
  Label,
  Title,
} from "@/components/ui/typography";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { useCharacter } from "@/context/character";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Profile() {
  const { character } = useCharacter();

  return (
    <Page>
      <Title>Tente du héros</Title>
      <Body muted style={styles.pageSubtitle}>
        Profil et progression
      </Body>

      <Card style={styles.heroCard}>
        <View style={styles.avatarBox}>
          <Label style={styles.avatarText}>🧍</Label>
        </View>

        <View style={styles.heroInfo}>
          <Heading>{character.name}</Heading>

          <Label color={Colors.primary} style={styles.heroLevel}>
            Niveau {character.level}
          </Label>

          <View style={styles.goldRow}>
            <Label style={styles.goldIcon}>🪙</Label>
            <Label color={Colors.gold}>{character.gold} or</Label>
          </View>
        </View>
      </Card>

      <Section title="Attributs">
        <View style={styles.statGrid}>
          <StatCard
            label="Force"
            value={character.strength}
            color={Colors.stats.strength}
          />

          <StatCard
            label="Endurance"
            value={character.endurance}
            color={Colors.stats.endurance}
          />

          <StatCard
            label="Vitalité"
            value={character.vitality}
            color={Colors.stats.vitality}
          />

          <StatCard
            label="Discipline"
            value={character.discipline}
            color={Colors.stats.discipline}
          />
        </View>
      </Section>

      <Section title="Exploits de voyage">
        <Card style={styles.recordsCard}>
          <RecordRow
            label="Distance totale"
            value={`${character.lifetimeDistance} km`}
          />

          <RecordRow
            label="Endurance gagnée"
            value={`${character.lifetimeEndurance}`}
          />

          <RecordRow
            label="Records personnels"
            value={`${character.lifetimePRs}`}
          />

          <RecordRow
            label="Semaines d'entraînement"
            value={`${character.lifetimeTrainingWeeks}`}
          />

          <RecordRow
            label="Volume soulevé"
            value={`${character.lifetimeVolume} kg`}
          />

          <RecordRow
            label="Séances terminées"
            value={`${character.lifetimeWorkouts}`}
            isLast
          />
        </Card>
      </Section>
    </Page>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  color: string;
};

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <Card style={[styles.statCard, { borderColor: color }]}>
      <Heading color={color} style={styles.statValue}>
        {value}
      </Heading>

      <Caption muted style={styles.statLabel}>
        {label}
      </Caption>
    </Card>
  );
}

type RecordRowProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

function RecordRow({ label, value, isLast = false }: RecordRowProps) {
  return (
    <View style={[styles.recordRow, isLast && styles.recordRowLast]}>
      <Body muted style={styles.recordLabel}>
        {label}
      </Body>

      <Label style={styles.recordValue}>{value}</Label>
    </View>
  );
}

const styles = StyleSheet.create({
  pageSubtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },

  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
  },

  avatarBox: {
    width: 92,
    height: 92,
    borderRadius: Radius.lg,
    backgroundColor: Colors.cardSoft,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 46,
    lineHeight: 54,
  },

  heroInfo: {
    flex: 1,
    marginLeft: Spacing.lg,
  },

  heroLevel: {
    marginTop: Spacing.xs,
  },

  goldRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primarySoft,
  },

  goldIcon: {
    marginRight: Spacing.sm,
  },

  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },

  statCard: {
    width: "47%",
    alignItems: "center",
    paddingVertical: Spacing.lg,
  },

  statValue: {
    textAlign: "center",
  },

  statLabel: {
    marginTop: Spacing.xs,
    textAlign: "center",
  },

  recordsCard: {
    paddingVertical: 0,
  },

  recordRow: {
    minHeight: 52,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },

  recordRowLast: {
    borderBottomWidth: 0,
  },

  recordLabel: {
    flex: 1,
  },

  recordValue: {
    textAlign: "right",
  },
});
