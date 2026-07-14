import { Card } from "@/components/ui/cards";
import { Page } from "@/components/ui/layout";
import { BackButton } from "@/components/ui/navigation";
import { Section } from "@/components/ui/section";
import {
  Body,
  Caption,
  Heading,
  Label,
  Title,
} from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { getExercises } from "@/services/exercise";
import { getWorkoutSessions, getWorkoutTemplates } from "@/services/workout";
import { Exercise } from "@/types/exercise";
import { WorkoutSession, WorkoutTemplate } from "@/types/workout";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function WorkoutListScreen() {
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(
    null,
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([]);
  const [workoutTemplates, setWorkoutTemplates] = useState<WorkoutTemplate[]>(
    [],
  );

  useEffect(() => {
    async function loadData() {
      const fetchedWorkoutSessions = await getWorkoutSessions();
      const fetchedWorkoutTemplates = await getWorkoutTemplates();
      const fetchedExercise = await getExercises();
      setWorkoutSessions(fetchedWorkoutSessions);
      setWorkoutTemplates(fetchedWorkoutTemplates);
      setExercises(fetchedExercise);
    }
    loadData();
  }, []);

  function toggleSession(sessionId: string) {
    setExpandedSessionId((currentId) =>
      currentId === sessionId ? null : sessionId,
    );
  }

  return (
    <Page>
      <View style={styles.header}>
        <BackButton />

        <Title style={styles.title}>Camp d'entraînement</Title>
      </View>

      <Body muted style={styles.pageSubtitle}>
        Choisis ta prochaine séance
      </Body>

      <Section title="Séances disponibles">
        <View style={styles.templateList}>
          {workoutTemplates.map((workout) => (
            <Pressable
              key={workout.id}
              onPress={() => router.push(`/workout/${workout.id}`)}
              style={({ pressed }) => [
                styles.templateCard,
                pressed && styles.templateCardPressed,
              ]}
            >
              <View style={styles.templateContent}>
                <Heading color={Colors.primary} style={styles.templateName}>
                  {workout.name}
                </Heading>

                <Caption muted style={styles.templateSubtitle}>
                  Préparer l’expédition
                </Caption>
              </View>

              <Label color={Colors.primary} style={styles.arrow}>
                ›
              </Label>
            </Pressable>
          ))}
        </View>
      </Section>

      <Section title="Historique du camp">
        <View style={styles.historyList}>
          {workoutSessions.map((session) => {
            const isExpanded = expandedSessionId === session.id;

            return (
              <HistoryCard
                key={session.id}
                session={session}
                isExpanded={isExpanded}
                onPress={() => toggleSession(session.id)}
                exercises={exercises}
                workoutTemplates={workoutTemplates}
              />
            );
          })}
        </View>
      </Section>
    </Page>
  );
}

type HistoryCardProps = {
  session: WorkoutSession;
  isExpanded: boolean;
  onPress: () => void;
  exercises: Exercise[];
  workoutTemplates: WorkoutTemplate[];
};

function HistoryCard({
  session,
  isExpanded,
  onPress,
  exercises,
  workoutTemplates,
}: HistoryCardProps) {
  const template = workoutTemplates.find(
    (workoutTemplate) => workoutTemplate.id === session.templateId,
  );

  return (
    <Card style={styles.historyCard}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.historyPressable,
          pressed && styles.historyPressed,
        ]}
      >
        <View style={styles.historyHeader}>
          <View style={styles.historyMainInfo}>
            <Heading style={styles.historyName}>
              {template?.name ?? "Séance"}
            </Heading>

            <Caption muted style={styles.historyDate}>
              {formatSessionDate(session.date)}
            </Caption>
          </View>

          <View style={styles.historyRight}>
            <Label color={Colors.primary}>
              {Math.floor(session.duration / 60)} min
            </Label>

            <Label
              color={isExpanded ? Colors.primary : Colors.textMuted}
              style={styles.dropdownArrow}
            >
              {isExpanded ? "⌃" : "⌄"}
            </Label>
          </View>
        </View>

        {!!session.notes && (
          <Body muted style={styles.notes}>
            {session.notes}
          </Body>
        )}
      </Pressable>

      {isExpanded && (
        <View style={styles.sessionDetails}>
          {session.exercises.length === 0 ? (
            <Body muted style={styles.emptyExercises}>
              Aucun exercice enregistré.
            </Body>
          ) : (
            session.exercises.map((loggedExercise, exerciseIndex) => {
              const exercise = exercises.find(
                (item) => item.id === loggedExercise.exerciseId,
              );

              return (
                <View
                  key={`${loggedExercise.exerciseId}-${exerciseIndex}`}
                  style={[
                    styles.exerciseDetails,
                    exerciseIndex === session.exercises.length - 1 &&
                      styles.lastExerciseDetails,
                  ]}
                >
                  <Heading style={styles.exerciseName}>
                    {exercise?.name ?? "Exercice inconnu"}
                  </Heading>

                  {loggedExercise.type === "strength" ? (
                    <StrengthExerciseDetails sets={loggedExercise.sets} />
                  ) : (
                    <CardioExerciseDetails
                      duration={loggedExercise.duration}
                      distance={loggedExercise.distance}
                    />
                  )}
                </View>
              );
            })
          )}
        </View>
      )}
    </Card>
  );
}

type StrengthExerciseDetailsProps = {
  sets: {
    weight: number;
    reps: number;
  }[];
};

function StrengthExerciseDetails({ sets }: StrengthExerciseDetailsProps) {
  return (
    <View style={styles.setList}>
      <View style={styles.setHeader}>
        <Caption muted style={styles.setColumn}>
          SÉRIE
        </Caption>

        <Caption muted style={styles.setColumn}>
          POIDS
        </Caption>

        <Caption muted style={styles.setColumn}>
          REPS
        </Caption>
      </View>

      {sets.map((set, index) => (
        <View key={index} style={styles.setRow}>
          <Label color={Colors.primary} style={styles.setColumn}>
            {index + 1}
          </Label>

          <Body style={styles.setColumn}>{set.weight} kg</Body>

          <Body style={styles.setColumn}>{set.reps}</Body>
        </View>
      ))}
    </View>
  );
}

type CardioExerciseDetailsProps = {
  duration: number;
  distance?: number;
};

function CardioExerciseDetails({
  duration,
  distance,
}: CardioExerciseDetailsProps) {
  return (
    <View style={styles.cardioDetails}>
      <View style={styles.cardioValue}>
        <Caption muted>Durée</Caption>
        <Label>{Math.floor(duration / 60)} min</Label>
      </View>

      {distance !== undefined && (
        <View style={styles.cardioValue}>
          <Caption muted>Distance</Caption>
          <Label>{distance} km</Label>
        </View>
      )}
    </View>
  );
}

function formatSessionDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("fr-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },

  title: {
    flex: 1,
  },

  pageSubtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },

  templateList: {
    gap: Spacing.md,
  },

  templateCard: {
    minHeight: 82,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
    backgroundColor: Colors.primarySoft,
    borderWidth: Border.thin,
    borderColor: Colors.primary,
    borderRadius: Radius.lg,
  },

  templateCardPressed: {
    opacity: 0.75,
    transform: [{ translateY: 2 }],
  },

  templateContent: {
    flex: 1,
  },

  templateName: {
    fontSize: 18,
    lineHeight: 24,
  },

  templateSubtitle: {
    marginTop: Spacing.xs,
  },

  arrow: {
    fontSize: 32,
    lineHeight: 34,
  },

  historyList: {
    gap: Spacing.md,
  },

  historyCard: {
    padding: 0,
    overflow: "hidden",
    backgroundColor: Colors.card,
  },

  historyPressable: {
    padding: Spacing.lg,
  },

  historyPressed: {
    opacity: 0.7,
  },

  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },

  historyMainInfo: {
    flex: 1,
  },

  historyName: {
    fontSize: 16,
    lineHeight: 22,
  },

  historyDate: {
    marginTop: Spacing.xs,
  },

  historyRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },

  dropdownArrow: {
    width: 18,
    textAlign: "center",
    fontSize: 18,
  },

  notes: {
    marginTop: Spacing.sm,
  },

  sessionDetails: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderTopWidth: Border.thin,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.surface,
  },

  emptyExercises: {
    paddingTop: Spacing.lg,
    textAlign: "center",
  },

  exerciseDetails: {
    paddingVertical: Spacing.lg,
    borderBottomWidth: Border.thin,
    borderBottomColor: Colors.divider,
  },

  lastExerciseDetails: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },

  exerciseName: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },

  setList: {
    overflow: "hidden",
    backgroundColor: Colors.card,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
  },

  setHeader: {
    flexDirection: "row",
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.cardSoft,
    borderBottomWidth: Border.thin,
    borderBottomColor: Colors.border,
  },

  setRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    paddingVertical: Spacing.sm,
    borderBottomWidth: Border.thin,
    borderBottomColor: Colors.divider,
  },

  setColumn: {
    flex: 1,
    textAlign: "center",
  },

  cardioDetails: {
    flexDirection: "row",
    gap: Spacing.md,
  },

  cardioValue: {
    flex: 1,
    gap: Spacing.xs,
    padding: Spacing.md,
    backgroundColor: Colors.card,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
  },
});
