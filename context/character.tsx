import { getNewlyUnlockedAchievements } from "@/models/achievement";
import {
  applyDisciplineDecay,
  applyEnduranceDecay,
  applyStrengthDecay,
  applyVitalityDecay,
  calculateDiscipline,
  calculateEndurance,
  calculateStrength,
  calculateVitality,
  getNewLevel,
} from "@/models/progression";
import { getAchievements } from "@/services/achievement";
import { getCharacter } from "@/services/character";
import { Achievement } from "@/types/achievement";
import { Character } from "@/types/character";
import { Exercise } from "@/types/exercise";
import { WorkoutSession } from "@/types/workout";
import { getCompletedTrainingWeeks } from "@/utils/date";
import { createContext, useContext, useEffect, useState } from "react";

interface CharacterContextValue {
  character: Character | undefined;
  isLoading: boolean;

  completeSession: (
    session: WorkoutSession,
    sessions: WorkoutSession[],
    exercises: Exercise[],
    xpGained: number,
    prsCount: number,
  ) => void;

  updateName: (newName: string) => void;
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character>();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      const fetchedCharacter = await getCharacter();
      const fetchedAchievements = await getAchievements();
      setCharacter(fetchedCharacter);
      setAchievements(fetchedAchievements);
      setIsLoading(false);
    }
    loadData();
  }, []);

  function addXp(xpGained: number) {
    if (!character) return;
    const { newLevel, remainingXp } = getNewLevel(
      character.level,
      character.xp + xpGained,
    );

    if (newLevel > character.level) {
      console.log(`Level up ! ${character.level} → ${newLevel}`);
    }

    setCharacter({
      ...character,
      level: newLevel,
      xp: remainingXp,
    });
  }

  function updateCharacterStats(
    sessions: WorkoutSession[],
    exercises: Exercise[],
  ) {
    if (!character) return;
    const strength = calculateStrength(sessions);

    const endurance = calculateEndurance(sessions, exercises);

    const vitality = calculateVitality(sessions);

    const discipline = calculateDiscipline(sessions);

    setCharacter({
      ...character,

      strength: applyStrengthDecay(strength, sessions),

      endurance: applyEnduranceDecay(endurance, sessions),

      vitality: applyVitalityDecay(vitality, sessions),

      discipline: applyDisciplineDecay(discipline, sessions),
    });
  }

  function updateAfterSession(
    session: WorkoutSession,
    sessions: WorkoutSession[],
    prsCount: number,
  ) {
    let sessionVolume = 0;
    let sessionDistance = 0;

    for (const exercise of session.exercises) {
      if (exercise.type === "cardio") {
        sessionDistance += exercise.distance ?? 0;
      } else {
        for (const set of exercise.sets) {
          sessionVolume += set.weight * set.reps;
        }
      }
    }

    setCharacter((current) => {
      if (!current) return current;

      const updatedCharacter: Character = {
        ...current,

        lifetimeVolume: current.lifetimeVolume + sessionVolume,

        lifetimeDistance: current.lifetimeDistance + sessionDistance,

        lifetimeWorkouts: current.lifetimeWorkouts + 1,

        lifetimePRs: current.lifetimePRs + prsCount,

        lifetimeTrainingWeeks: getCompletedTrainingWeeks(sessions),
      };

      const newAchievements = getNewlyUnlockedAchievements(
        updatedCharacter,
        achievements,
      );

      return {
        ...updatedCharacter,

        unlockedAchievements: [
          ...updatedCharacter.unlockedAchievements,

          ...newAchievements.map((achievement) => ({
            achievementId: achievement.id,
            unlockedAt: new Date().toISOString(),
          })),
        ],
      };
    });
  }

  function completeSession(
    session: WorkoutSession,
    sessions: WorkoutSession[],
    exercises: Exercise[],
    xpGained: number,
    prsCount: number,
  ) {
    addXp(xpGained);

    updateCharacterStats(sessions, exercises);

    updateAfterSession(session, sessions, prsCount);
  }

  function updateName(newName: string) {
    if (!character) return;
    setCharacter({ ...character, name: newName });
  }

  return (
    <CharacterContext.Provider
      value={{
        character,
        isLoading,
        completeSession,
        updateName,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter(): CharacterContextValue & {
  character: Character;
} {
  const context = useContext(CharacterContext);
  if (!context)
    throw new Error("useCharacter must be used within a CharacterProvider");
  if (!context.character && !context.isLoading)
    throw new Error("Character not loaded yet");
  return context as CharacterContextValue & { character: Character };
}
