import { Badge } from "@/components/ui/badges";
import { Card } from "@/components/ui/cards";
import { ProgressBar } from "@/components/ui/progress";
import { Body, Caption, Heading, Label } from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { getQuestStatus } from "@/models/quest";
import { Quest } from "@/types/quest";
import { StyleSheet, View } from "react-native";

type QuestItemProps = {
  quest: Quest;
};

type QuestStatusDisplay = {
  label: string;
  icon: string;
  badgeVariant: "default" | "primary" | "success";
};

function getStatusDisplay(status: string): QuestStatusDisplay {
  switch (status) {
    case "not_started":
      return {
        label: "Disponible",
        icon: "📜",
        badgeVariant: "default",
      };

    case "in_progress":
      return {
        label: "En mission",
        icon: "⚔️",
        badgeVariant: "primary",
      };

    case "completed":
      return {
        label: "Terminé",
        icon: "🏆",
        badgeVariant: "success",
      };

    default:
      return {
        label: status,
        icon: "❔",
        badgeVariant: "default",
      };
  }
}

export function QuestItem({ quest }: QuestItemProps) {
  const status = getQuestStatus(quest);
  const statusDisplay = getStatusDisplay(status);

  const isCompleted = status === "completed" || quest.progression >= quest.goal;

  const currentProgress = Math.min(quest.progression, quest.goal);

  const progressPercent =
    quest.goal > 0 ? (currentProgress / quest.goal) * 100 : 0;

  return (
    <Card style={[styles.card, isCompleted && styles.completedCard]}>
      <View style={styles.header}>
        <Heading
          style={styles.title}
          color={isCompleted ? Colors.success : Colors.text}
        >
          {quest.title}
        </Heading>

        <Badge variant={isCompleted ? "success" : statusDisplay.badgeVariant}>
          {isCompleted
            ? "🏆 Terminé"
            : `${statusDisplay.icon} ${statusDisplay.label}`}
        </Badge>
      </View>

      <Body muted style={styles.description}>
        {quest.description}
      </Body>

      <View
        style={[
          styles.progressSection,
          isCompleted && styles.completedProgressSection,
        ]}
      >
        <View style={styles.progressHeader}>
          <Caption muted>Progression</Caption>

          <Label color={isCompleted ? Colors.success : Colors.text}>
            {currentProgress} / {quest.goal}
          </Label>
        </View>

        <ProgressBar
          value={progressPercent}
          color={isCompleted ? Colors.success : Colors.primary}
          height={8}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
  },

  completedCard: {
    backgroundColor: "#14281E",
    borderColor: Colors.success,
    borderWidth: Border.normal,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.md,
  },

  title: {
    flex: 1,
    fontSize: 17,
    lineHeight: 23,
  },

  description: {
    marginTop: Spacing.sm,
  },

  progressSection: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },

  completedProgressSection: {
    backgroundColor: "#10241A",
    borderColor: Colors.success,
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },
});
