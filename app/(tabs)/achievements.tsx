import { Badge } from "@/components/ui/badges";
import { Card } from "@/components/ui/cards";
import { Page } from "@/components/ui/layout";
import { ProgressBar } from "@/components/ui/progress";
import {
  Body,
  Caption,
  Heading,
  Label,
  Title,
} from "@/components/ui/typography";
import { Border, Colors, Radius, Shadows, Spacing } from "@/constants/theme";
import { useCharacter } from "@/context/character";
import { getAchievements } from "@/services/achievement";
import {
  Achievement,
  AchievementCategory,
  AchievementRarity,
} from "@/types/achievement";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type CategoryFilter = AchievementCategory | "all";
type RarityFilter = AchievementRarity | "all";

const categoryLabels: Record<AchievementCategory, string> = {
  [AchievementCategory.STRENGTH]: "FORCE",
  [AchievementCategory.ENDURANCE]: "ENDURANCE",
  [AchievementCategory.VITALITY]: "VITALITÉ",
  [AchievementCategory.DISCIPLINE]: "DISCIPLINE",
  [AchievementCategory.LEVEL]: "NIVEAU",
  [AchievementCategory.STREAK]: "SÉRIE",
  [AchievementCategory.RECORD]: "RECORD",
  [AchievementCategory.SPECIAL]: "SPÉCIAL",
};

const categoryColors: Record<AchievementCategory, string> = {
  [AchievementCategory.STRENGTH]: Colors.stats.strength,
  [AchievementCategory.ENDURANCE]: Colors.stats.endurance,
  [AchievementCategory.VITALITY]: Colors.stats.vitality,
  [AchievementCategory.DISCIPLINE]: Colors.stats.discipline,
  [AchievementCategory.LEVEL]: Colors.primary,
  [AchievementCategory.STREAK]: Colors.gold,
  [AchievementCategory.RECORD]: Colors.info,
  [AchievementCategory.SPECIAL]: Colors.silver,
};

const rarityLabels: Record<AchievementRarity, string> = {
  [AchievementRarity.COMMON]: "COMMUN",
  [AchievementRarity.UNCOMMON]: "PEU COMMUN",
  [AchievementRarity.RARE]: "RARE",
  [AchievementRarity.EPIC]: "ÉPIQUE",
  [AchievementRarity.LEGENDARY]: "LÉGENDAIRE",
};

const rarityColors: Record<AchievementRarity, string> = {
  [AchievementRarity.COMMON]: Colors.silver,
  [AchievementRarity.UNCOMMON]: Colors.success,
  [AchievementRarity.RARE]: Colors.info,
  [AchievementRarity.EPIC]: "#9B72D2",
  [AchievementRarity.LEGENDARY]: Colors.gold,
};

export default function AchievementScreen() {
  const { character } = useCharacter();

  const [filtersOpened, setFiltersOpened] = useState(false);
  const [showUnlocked, setShowUnlocked] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("all");
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    async function loadData() {
      const fetchedAchievements = await getAchievements();
      setAchievements(fetchedAchievements);
    }
    loadData();
  }, []);

  function getAchievementProgress(category: AchievementCategory): number {
    switch (category) {
      case AchievementCategory.STRENGTH:
        return character.lifetimeVolume;

      case AchievementCategory.ENDURANCE:
        return character.lifetimeDistance;

      case AchievementCategory.VITALITY:
        return character.lifetimeWorkouts;

      case AchievementCategory.DISCIPLINE:
        return character.lifetimeTrainingWeeks;

      case AchievementCategory.LEVEL:
        return character.level;

      case AchievementCategory.RECORD:
        return character.lifetimePRs;

      case AchievementCategory.STREAK: {
        return character.currentStreak ?? 0;
      }

      case AchievementCategory.SPECIAL:
        return character.lifetimeWorkouts;

      default:
        return 0;
    }
  }

  function isAchievementCompleted(
    achievementId: string,
    category: AchievementCategory,
    objective: number,
  ): boolean {
    const isStoredAsUnlocked = character.unlockedAchievements.some(
      (unlockedAchievement) =>
        unlockedAchievement.achievementId === achievementId,
    );

    const progress = getAchievementProgress(category);

    return isStoredAsUnlocked || progress >= objective;
  }

  const visibleAchievements = achievements.filter((achievement) => {
    const isCompleted = isAchievementCompleted(
      achievement.id,
      achievement.category,
      achievement.objective,
    );

    const matchesUnlockedFilter = showUnlocked || !isCompleted;

    const matchesCategory =
      categoryFilter === "all" || achievement.category === categoryFilter;

    const matchesRarity =
      rarityFilter === "all" || achievement.rarity === rarityFilter;

    return matchesUnlockedFilter && matchesCategory && matchesRarity;
  });

  const hasActiveFilters =
    showUnlocked || categoryFilter !== "all" || rarityFilter !== "all";

  function resetFilters() {
    setShowUnlocked(false);
    setCategoryFilter("all");
    setRarityFilter("all");
  }

  return (
    <Page>
      <View style={styles.pageHeader}>
        <View style={styles.pageHeaderText}>
          <Title>Hall des exploits</Title>

          <Body muted style={styles.pageSubtitle}>
            Tes hauts faits d’aventurier
          </Body>
        </View>

        <View style={styles.filterContainer}>
          <Pressable
            onPress={() => setFiltersOpened((current) => !current)}
            style={({ pressed }) => [
              styles.filterButton,
              filtersOpened && styles.filterButtonOpened,
              hasActiveFilters && styles.filterButtonActive,
              pressed && styles.filterButtonPressed,
            ]}
          >
            <Label
              color={
                filtersOpened || hasActiveFilters ? Colors.primary : Colors.text
              }
            >
              Filtres
            </Label>

            <Label
              color={
                filtersOpened || hasActiveFilters
                  ? Colors.primary
                  : Colors.textMuted
              }
            >
              {filtersOpened ? "⌃" : "⌄"}
            </Label>
          </Pressable>

          {filtersOpened && (
            <View style={styles.filterDropdown}>
              <Pressable
                onPress={() => setShowUnlocked((current) => !current)}
                style={({ pressed }) => [
                  styles.checkboxRow,
                  pressed && styles.filterOptionPressed,
                ]}
              >
                <View
                  style={[
                    styles.checkbox,
                    showUnlocked && styles.checkboxChecked,
                  ]}
                >
                  {showUnlocked && (
                    <Label
                      color={Colors.background}
                      style={styles.checkboxIcon}
                    >
                      ✓
                    </Label>
                  )}
                </View>

                <Label style={styles.checkboxLabel}>
                  Afficher les débloqués
                </Label>
              </Pressable>

              <View style={styles.filterDivider} />

              <Caption muted style={styles.filterTitle}>
                CATÉGORIE
              </Caption>

              <View style={styles.filterOptions}>
                <FilterChip
                  label="TOUTES"
                  selected={categoryFilter === "all"}
                  onPress={() => setCategoryFilter("all")}
                />

                {Object.values(AchievementCategory).map((category) => (
                  <FilterChip
                    key={category}
                    label={categoryLabels[category]}
                    color={categoryColors[category]}
                    selected={categoryFilter === category}
                    onPress={() => setCategoryFilter(category)}
                  />
                ))}
              </View>

              <View style={styles.filterDivider} />

              <Caption muted style={styles.filterTitle}>
                RARETÉ
              </Caption>

              <View style={styles.filterOptions}>
                <FilterChip
                  label="TOUTES"
                  selected={rarityFilter === "all"}
                  onPress={() => setRarityFilter("all")}
                />

                {Object.values(AchievementRarity).map((rarity) => (
                  <FilterChip
                    key={rarity}
                    label={rarityLabels[rarity]}
                    color={rarityColors[rarity]}
                    selected={rarityFilter === rarity}
                    onPress={() => setRarityFilter(rarity)}
                  />
                ))}
              </View>

              {hasActiveFilters && (
                <>
                  <View style={styles.filterDivider} />

                  <Pressable
                    onPress={resetFilters}
                    style={({ pressed }) => [
                      styles.resetButton,
                      pressed && styles.filterOptionPressed,
                    ]}
                  >
                    <Label color={Colors.primary}>Réinitialiser</Label>
                  </Pressable>
                </>
              )}
            </View>
          )}
        </View>
      </View>

      <View style={styles.achievementList}>
        {visibleAchievements.map((achievement) => {
          const rawProgress = getAchievementProgress(achievement.category);

          const isCompleted = isAchievementCompleted(
            achievement.id,
            achievement.category,
            achievement.objective,
          );

          const currentProgress = isCompleted
            ? achievement.objective
            : Math.min(rawProgress, achievement.objective);

          const progressPercentage =
            achievement.objective > 0
              ? (currentProgress / achievement.objective) * 100
              : 0;

          return (
            <Card
              key={achievement.id}
              style={[
                styles.achievementCard,
                isCompleted && styles.achievementCardCompleted,
              ]}
            >
              <View style={styles.cardHeader}>
                <Heading
                  style={styles.achievementName}
                  color={isCompleted ? Colors.success : Colors.text}
                >
                  {achievement.name}
                </Heading>

                <Badge variant={isCompleted ? "success" : "default"}>
                  {isCompleted ? "✓ Débloqué" : "En cours"}
                </Badge>
              </View>

              <Body muted style={styles.description}>
                {achievement.description}
              </Body>

              <View
                style={[
                  styles.progressSection,
                  isCompleted && styles.progressSectionCompleted,
                ]}
              >
                <View style={styles.progressHeader}>
                  <Caption muted>Progression</Caption>

                  <Label color={isCompleted ? Colors.success : Colors.text}>
                    {currentProgress} / {achievement.objective}
                  </Label>
                </View>

                <ProgressBar
                  value={progressPercentage}
                  color={isCompleted ? Colors.success : Colors.primary}
                  height={8}
                />
              </View>

              <View style={styles.tagRow}>
                <AchievementTag
                  label={categoryLabels[achievement.category]}
                  color={categoryColors[achievement.category]}
                />

                <AchievementTag
                  label={rarityLabels[achievement.rarity]}
                  color={rarityColors[achievement.rarity]}
                />
              </View>
            </Card>
          );
        })}

        {visibleAchievements.length === 0 && (
          <Card style={styles.emptyCard}>
            <Heading style={styles.emptyTitle}>Aucun exploit trouvé</Heading>

            <Body muted style={styles.emptyText}>
              Modifie les filtres pour afficher d’autres exploits.
            </Body>

            {hasActiveFilters && (
              <Pressable
                onPress={resetFilters}
                style={({ pressed }) => [
                  styles.emptyResetButton,
                  pressed && styles.filterOptionPressed,
                ]}
              >
                <Label color={Colors.primary}>Réinitialiser les filtres</Label>
              </Pressable>
            )}
          </Card>
        )}
      </View>
    </Page>
  );
}

type FilterChipProps = {
  label: string;
  selected: boolean;
  color?: string;
  onPress: () => void;
};

function FilterChip({
  label,
  selected,
  color = Colors.primary,
  onPress,
}: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterChip,
        selected && {
          borderColor: color,
          backgroundColor: `${color}22`,
        },
        pressed && styles.filterOptionPressed,
      ]}
    >
      <Caption
        style={[
          styles.filterChipText,
          selected && {
            color,
          },
        ]}
      >
        {label}
      </Caption>
    </Pressable>
  );
}

type AchievementTagProps = {
  label: string;
  color: string;
};

function AchievementTag({ label, color }: AchievementTagProps) {
  return (
    <View
      style={[
        styles.achievementTag,
        {
          borderColor: color,
          backgroundColor: `${color}22`,
        },
      ]}
    >
      <Caption
        style={[
          styles.achievementTagText,
          {
            color,
          },
        ]}
      >
        {label}
      </Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    position: "relative",
    zIndex: 100,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },

  pageHeaderText: {
    flex: 1,
  },

  pageSubtitle: {
    marginTop: Spacing.xs,
  },

  filterContainer: {
    position: "relative",
    zIndex: 110,
  },

  filterButton: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.card,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
  },

  filterButtonOpened: {
    backgroundColor: Colors.primarySoft,
    borderColor: Colors.primary,
  },

  filterButtonActive: {
    borderColor: Colors.primary,
  },

  filterButtonPressed: {
    opacity: 0.7,
  },

  filterDropdown: {
    position: "absolute",
    top: 48,
    right: 0,
    width: 250,
    zIndex: 200,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderWidth: Border.thin,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
    ...Shadows.floating,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    minHeight: 36,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: Radius.xs,
    borderWidth: Border.normal,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  checkboxIcon: {
    fontSize: 12,
    lineHeight: 14,
  },

  checkboxLabel: {
    flex: 1,
    fontSize: 13,
  },

  filterDivider: {
    height: Border.thin,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.md,
  },

  filterTitle: {
    marginBottom: Spacing.sm,
    fontSize: 11,
    letterSpacing: 0.8,
  },

  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },

  filterChip: {
    minHeight: 28,
    justifyContent: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.card,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.pill,
  },

  filterChipText: {
    color: Colors.textMuted,
    fontSize: 10,
    lineHeight: 14,
  },

  resetButton: {
    alignItems: "center",
    paddingVertical: Spacing.xs,
  },

  filterOptionPressed: {
    opacity: 0.65,
  },

  achievementList: {
    zIndex: 1,
    gap: Spacing.md,
  },

  achievementCard: {
    backgroundColor: Colors.surface,
  },

  achievementCardCompleted: {
    backgroundColor: "#14281E",
    borderColor: Colors.success,
    borderWidth: Border.normal,
    ...Shadows.card,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.md,
  },

  achievementName: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
  },

  description: {
    marginTop: Spacing.md,
  },

  progressSection: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.card,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },

  progressSectionCompleted: {
    backgroundColor: "#10241A",
    borderColor: Colors.success,
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },

  achievementTag: {
    alignSelf: "flex-start",
    borderWidth: Border.normal,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },

  achievementTagText: {
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },

  emptyCard: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },

  emptyTitle: {
    textAlign: "center",
  },

  emptyText: {
    marginTop: Spacing.sm,
    textAlign: "center",
  },

  emptyResetButton: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primarySoft,
    borderWidth: Border.thin,
    borderColor: Colors.primary,
    borderRadius: Radius.md,
  },
});
