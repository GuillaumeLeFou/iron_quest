import { PrimaryButton } from "@/components/ui/buttons";
import { Card } from "@/components/ui/cards";
import { Page } from "@/components/ui/layout";
import { BackButton } from "@/components/ui/navigation";
import {
  Body,
  Caption,
  Heading,
  Label,
  Title,
} from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { getLastPerformance } from "@/models/workout";
import { getExercises } from "@/services/exercise";
import { saveCurrentSession } from "@/services/session";
import { getWorkoutSessions, getWorkoutTemplates } from "@/services/workout";
import { Exercise } from "@/types/exercise";
import { SetEntry, WorkoutSession, WorkoutTemplate } from "@/types/workout";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([]);
  const [workoutTemplates, setWorkoutTemplates] = useState<WorkoutTemplate[]>(
    [],
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sets, setSets] = useState<Record<string, SetEntry[]>>({});
  const [duration, setDuration] = useState("");

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

  const workout = workoutTemplates.find(
    (template: { id: string }) => template.id === id,
  );

  const filteredExercises = exercises.filter((exercise) =>
    workout?.exerciseIds.includes(exercise.id),
  );

  useEffect(() => {
    if (filteredExercises.length === 0) return;

    const newSets: Record<string, SetEntry[]> = {};
    for (const exercise of filteredExercises) {
      const lastPerformance = getLastPerformance(exercise.id, workoutSessions);
      newSets[exercise.id] = lastPerformance ?? [{ weight: 0, reps: 0 }];
    }
    setSets(newSets);
  }, [filteredExercises.length, workoutSessions.length]);

  function handleAddSet(exerciseId: string) {
    setSets((currentSets) => ({
      ...currentSets,
      [exerciseId]: [
        ...currentSets[exerciseId],
        {
          weight: 0,
          reps: 0,
        },
      ],
    }));
  }

  function handleUpdateSet(
    exerciseId: string,
    index: number,
    field: keyof SetEntry,
    value: string,
  ) {
    setSets((currentSets) => ({
      ...currentSets,
      [exerciseId]: currentSets[exerciseId].map((set, setIndex) =>
        setIndex === index
          ? {
              ...set,
              [field]: Number(value),
            }
          : set,
      ),
    }));
  }

  function handleRemoveSet(exerciseId: string, index: number) {
    setSets((currentSets) => ({
      ...currentSets,
      [exerciseId]: currentSets[exerciseId].filter(
        (_, setIndex) => setIndex !== index,
      ),
    }));
  }

  function handleSessionComplete() {
    if (!workout) return;

    const session: WorkoutSession = {
      id: Date.now().toString(),
      templateId: workout.id,
      date: new Date().toISOString(),
      duration: Number(duration) * 60,
      notes: "",
      exercises: Object.entries(sets).map(([exerciseId, exerciseSets]) => ({
        type: "strength" as const,
        exerciseId,
        sets: exerciseSets,
      })),
    };

    saveCurrentSession(session);
    router.push("/workout/summary");
  }

  if (!workout) {
    return (
      <Page scroll={false} contentStyle={styles.emptyContent}>
        <Heading style={styles.emptyTitle}>Séance introuvable</Heading>

        <Body muted style={styles.emptyText}>
          Cette expédition n’existe plus dans le camp.
        </Body>
      </Page>
    );
  }

  return (
    <Page contentStyle={styles.pageContent}>
      <View style={styles.header}>
        <BackButton />
        <Title style={styles.title}>Séance en cours</Title>
      </View>

      <View style={styles.workoutHeader}>
        <Body muted style={styles.pageSubtitle}>
          {workout.name}
        </Body>

        <View style={styles.sessionDuration}>
          <Caption muted>Durée</Caption>

          <TextInput
            value={duration}
            onChangeText={setDuration}
            keyboardType="number-pad"
            style={styles.durationInput}
            placeholder="60"
            placeholderTextColor={Colors.textDisabled}
          />

          <Label muted>min</Label>
        </View>
      </View>

      <Card style={styles.infoPanel}>
        <Heading style={styles.infoTitle}>Ordre d’entraînement</Heading>

        <Body muted style={styles.infoText}>
          Note tes charges et tes répétitions pour renforcer ton héros.
        </Body>
      </Card>

      <View style={styles.exerciseList}>
        {filteredExercises.map((exercise) => {
          const isStrengthExercise = "equipment" in exercise;
          return (
            <Card key={exercise.id} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <View style={styles.exerciseHeaderText}>
                  <Heading style={styles.exerciseName}>{exercise.name}</Heading>
                  <Caption muted style={styles.exerciseSubtitle}>
                    {"equipment" in exercise ? "Séries de force" : "Cardio"}
                  </Caption>
                </View>

                {"equipment" in exercise && (
                  <Pressable
                    onPress={() => handleAddSet(exercise.id)}
                    style={({ pressed }) => [
                      styles.addButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Label color={Colors.primary}>+ Série</Label>
                  </Pressable>
                )}
              </View>

              {"equipment" in exercise ? (
                <>
                  <View style={styles.setHeader}>
                    <Caption muted style={styles.setHeaderText}>
                      Série
                    </Caption>

                    <Caption muted style={styles.setHeaderText}>
                      Kg
                    </Caption>

                    <Caption muted style={styles.setHeaderText}>
                      Reps
                    </Caption>

                    <Caption muted style={styles.setHeaderText}>
                      Action
                    </Caption>
                  </View>
                </>
              ) : (
                <View style={styles.cardioFields}>
                  <View style={styles.cardioField}>
                    <Caption muted style={styles.cardioLabel}>
                      Durée
                    </Caption>

                    <View style={styles.cardioInputRow}>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={Colors.textDisabled}
                        keyboardType="number-pad"
                        style={styles.cardioInput}
                        selectTextOnFocus
                      />

                      <Label muted style={styles.cardioUnit}>
                        min
                      </Label>
                    </View>
                  </View>

                  {"trackDistance" in exercise && exercise.trackDistance && (
                    <View style={styles.cardioField}>
                      <Caption muted style={styles.cardioLabel}>
                        Distance
                      </Caption>

                      <View style={styles.cardioInputRow}>
                        <TextInput
                          placeholder="0"
                          placeholderTextColor={Colors.textDisabled}
                          keyboardType="decimal-pad"
                          style={styles.cardioInput}
                          selectTextOnFocus
                        />

                        <Label muted style={styles.cardioUnit}>
                          km
                        </Label>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {isStrengthExercise &&
                (sets[exercise.id] ?? []).map((set, index) => {
                  const canRemoveSet = sets[exercise.id].length > 1;

                  return (
                    <View key={index} style={styles.setRow}>
                      <Label color={Colors.primary} style={styles.setNumber}>
                        {index + 1}
                      </Label>

                      <TextInput
                        value={String(set.weight)}
                        onChangeText={(text) =>
                          handleUpdateSet(exercise.id, index, "weight", text)
                        }
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder="0"
                        placeholderTextColor={Colors.textDisabled}
                        selectTextOnFocus
                      />

                      <TextInput
                        value={String(set.reps)}
                        onChangeText={(text) =>
                          handleUpdateSet(exercise.id, index, "reps", text)
                        }
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder="0"
                        placeholderTextColor={Colors.textDisabled}
                        selectTextOnFocus
                      />

                      <Pressable
                        onPress={() => handleRemoveSet(exercise.id, index)}
                        disabled={!canRemoveSet}
                        style={({ pressed }) => [
                          styles.removeButton,
                          !canRemoveSet && styles.removeButtonDisabled,
                          pressed && canRemoveSet && styles.buttonPressed,
                        ]}
                      >
                        <Label
                          color={Colors.danger}
                          style={styles.removeButtonText}
                        >
                          ×
                        </Label>
                      </Pressable>
                    </View>
                  );
                })}
            </Card>
          );
        })}
      </View>

      <PrimaryButton
        title="Valider la séance"
        subtitle="Enregistrer tes performances"
        onPress={handleSessionComplete}
      />
    </Page>
  );
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

  pageContent: {
    paddingBottom: Spacing.xxxl,
  },

  pageSubtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },

  infoPanel: {
    backgroundColor: Colors.surface,
  },

  infoTitle: {
    fontSize: 18,
    lineHeight: 24,
  },

  infoText: {
    marginTop: Spacing.sm,
  },

  exerciseList: {
    gap: Spacing.lg,
    marginVertical: Spacing.lg,
  },

  exerciseCard: {
    backgroundColor: Colors.card,
  },

  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },

  exerciseHeaderText: {
    flex: 1,
  },

  exerciseName: {
    fontSize: 18,
    lineHeight: 24,
  },

  exerciseSubtitle: {
    marginTop: Spacing.xs,
  },

  addButton: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primarySoft,
    borderWidth: Border.thin,
    borderColor: Colors.primary,
    borderRadius: Radius.md,
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ translateY: 1 }],
  },

  setHeader: {
    flexDirection: "row",
    paddingBottom: Spacing.sm,
    borderBottomWidth: Border.thin,
    borderBottomColor: Colors.divider,
  },

  setHeaderText: {
    flex: 1,
    textAlign: "center",
    textTransform: "uppercase",
  },

  setRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingTop: Spacing.md,
  },

  setNumber: {
    flex: 1,
    textAlign: "center",
  },

  input: {
    flex: 1,
    minHeight: 42,
    backgroundColor: Colors.background,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    color: Colors.text,
    textAlign: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    fontWeight: "700",
  },

  removeButton: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#351719",
    borderWidth: Border.thin,
    borderColor: Colors.danger,
    borderRadius: Radius.md,
  },

  removeButtonDisabled: {
    opacity: 0.25,
  },

  removeButtonText: {
    fontSize: 20,
    lineHeight: 22,
  },

  emptyContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },

  emptyTitle: {
    textAlign: "center",
  },

  emptyText: {
    marginTop: Spacing.sm,
    textAlign: "center",
  },

  cardioFields: {
    flexDirection: "row",
    gap: Spacing.md,
  },

  cardioField: {
    flex: 1,
    gap: Spacing.sm,
  },

  cardioLabel: {
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  cardioInputRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
  },

  cardioInput: {
    flex: 1,
    minHeight: 46,
    color: Colors.text,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: Spacing.sm,
  },

  cardioUnit: {
    minWidth: 28,
    color: Colors.textMuted,
    textAlign: "right",
  },

  sessionInfo: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },

  sessionDuration: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: Spacing.sm,

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,

    backgroundColor: Colors.card,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
  },

  durationInput: {
    minWidth: 42,
    paddingVertical: 0,

    color: Colors.text,
    textAlign: "center",

    fontSize: 16,
    fontWeight: "700",
  },

  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
});
