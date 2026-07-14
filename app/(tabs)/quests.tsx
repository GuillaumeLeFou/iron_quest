import { QuestItem } from "@/components/questItem";
import { Card } from "@/components/ui/cards";
import { Page } from "@/components/ui/layout";
import {
  Body,
  Caption,
  Heading,
  Label,
  Title,
} from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { getQuests } from "@/services/quest";
import { Quest } from "@/types/quest";
import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type QuestSectionType = "daily" | "weekly";

type QuestSectionProps = {
  title: string;
  subtitle: string;
  type: QuestSectionType;
  children: ReactNode;
};

export default function QuestScreen() {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    async function loadData() {
      const fetchedQuests = await getQuests();
      setQuests(fetchedQuests);
    }
    loadData();
  });
  const dailyQuests = quests.filter((quest) => quest.type === "daily");

  const weeklyQuests = quests.filter((quest) => quest.type === "weekly");

  return (
    <Page>
      <Title>Tableau des quêtes</Title>

      <Body muted style={styles.pageSubtitle}>
        Missions du camp
      </Body>

      <Card style={styles.board}>
        <QuestSection
          title="Missions du Camp"
          subtitle="Le maître affiche ces missions chaque jour"
          type="daily"
        >
          {dailyQuests.map((quest) => (
            <QuestItem key={quest.id} quest={quest} />
          ))}
        </QuestSection>

        <View style={styles.sectionDivider} />

        <QuestSection
          title="Contrats du Royaume"
          subtitle="Des défis plus longs offrant de meilleures récompenses"
          type="weekly"
        >
          {weeklyQuests.map((quest) => (
            <QuestItem key={quest.id} quest={quest} />
          ))}
        </QuestSection>
      </Card>
    </Page>
  );
}

function QuestSection({ title, subtitle, type, children }: QuestSectionProps) {
  const isDaily = type === "daily";

  const accentColor = isDaily ? Colors.info : Colors.stats.discipline;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View
          style={[
            styles.sectionIcon,
            {
              backgroundColor: `${accentColor}22`,
              borderColor: accentColor,
            },
          ]}
        >
          <Label color={accentColor} style={styles.sectionIconText}>
            {isDaily ? "📜" : "📖"}
          </Label>
        </View>

        <View style={styles.sectionHeaderText}>
          <Heading style={styles.sectionTitle}>{title}</Heading>

          <Caption muted style={styles.sectionSubtitle}>
            {subtitle}
          </Caption>
        </View>

        <View
          style={[
            styles.typeBadge,
            {
              backgroundColor: `${accentColor}22`,
              borderColor: accentColor,
            },
          ]}
        >
          <Caption color={accentColor} style={styles.typeBadgeText}>
            {isDaily ? "JOUR" : "SEMAINE"}
          </Caption>
        </View>
      </View>

      <View style={styles.questList}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageSubtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },

  board: {
    backgroundColor: Colors.surface,
  },

  section: {
    width: "100%",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },

  sectionIcon: {
    width: 42,
    height: 42,
    borderWidth: Border.thin,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  sectionIconText: {
    fontSize: 20,
    lineHeight: 24,
  },

  sectionHeaderText: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
  },

  sectionSubtitle: {
    marginTop: Spacing.xs,
  },

  typeBadge: {
    alignSelf: "center",
    borderWidth: Border.thin,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },

  typeBadgeText: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  questList: {
    gap: Spacing.md,
  },

  sectionDivider: {
    height: Border.thin,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.xl,
  },
});
