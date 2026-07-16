import { supabase } from "@/lib/supabase";
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
import {
  getAchievements,
  saveUnlockedAchievement,
} from "@/services/achievement";
import { getCharacter, saveCharacter } from "@/services/character";
import { saveWorkoutSession } from "@/services/workout";
import { Achievement } from "@/types/achievement";
import { Character } from "@/types/character";
import { Exercise } from "@/types/exercise";
import { WorkoutSession } from "@/types/workout";
import { getCompletedTrainingWeeks } from "@/utils/date";
import { createContext, useContext, useEffect, useState } from "react";

interface CharacterContextValue {
  character: Character | null;
  isLoading: boolean;
  reloadCharacter: () => Promise<void>;

  completeSession: (
    session: WorkoutSession,
    sessions: WorkoutSession[],
    exercises: Exercise[],
    xpGained: number,
    prsCount: number,
  ) => Promise<void>;

  updateName: (newName: string) => void;
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (session?.user) {
        const fetchedCharacter = await getCharacter();
        const fetchedAchievements = await getAchievements();
        if (!mounted) return;
        setCharacter(fetchedCharacter ?? null);
        setAchievements(fetchedAchievements);
      } else {
        setCharacter(null);
        setAchievements([]);
      }
      setIsLoading(false);
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!character || isLoading) return;

    saveCharacter(character).catch((error) => {
      console.error("Erreur pendant la sauvegarde du personnage :", error);
    });
  }, [character, isLoading]);

  async function reloadCharacter() {
    setIsLoading(true);
    const fetchedCharacter = await getCharacter();
    const fetchedAchievements = await getAchievements();
    setCharacter(fetchedCharacter ?? null);
    setAchievements(fetchedAchievements);
    setIsLoading(false);
  }

  function addXp(xpGained: number) {
    setCharacter((current) => {
      if (!current) return current;

      const { newLevel, remainingXp } = getNewLevel(
        current.level,
        current.xp + xpGained,
      );

      if (newLevel > current.level) {
        console.log(`Level up ! ${current.level} → ${newLevel}`);
      }

      return {
        ...current,
        level: newLevel,
        xp: remainingXp,
      };
    });
  }

  function updateCharacterStats(
    sessions: WorkoutSession[],
    exercises: Exercise[],
  ) {
    setCharacter((current) => {
      if (!current) return current;

      const strength = calculateStrength(sessions);
      const endurance = calculateEndurance(sessions, exercises);
      const vitality = calculateVitality(sessions);
      const discipline = calculateDiscipline(sessions);

      return {
        ...current,

        strength: applyStrengthDecay(strength, sessions),

        endurance: applyEnduranceDecay(endurance, sessions),

        vitality: applyVitalityDecay(vitality, sessions),

        discipline: applyDisciplineDecay(discipline, sessions),
      };
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
        continue;
      }

      for (const set of exercise.sets) {
        sessionVolume += set.weight * set.reps;
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

      const newUnlockedAchievements = newAchievements.map((achievement) => ({
        achievementId: achievement.id,
        unlockedAt: new Date().toISOString(),
      }));

      for (const achievement of newAchievements) {
        void saveUnlockedAchievement(achievement.id).catch((error) => {
          console.error(
            `Erreur pendant la sauvegarde du succès ${achievement.id} :`,
            error,
          );
        });
      }

      return {
        ...updatedCharacter,

        unlockedAchievements: [
          ...updatedCharacter.unlockedAchievements,
          ...newUnlockedAchievements,
        ],
      };
    });
  }

  async function completeSession(
    session: WorkoutSession,
    sessions: WorkoutSession[],
    exercises: Exercise[],
    xpGained: number,
    prsCount: number,
  ) {
    await saveWorkoutSession(session);
    addXp(xpGained);

    updateCharacterStats(sessions, exercises);

    updateAfterSession(session, sessions, prsCount);
  }

  function updateName(newName: string) {
    setCharacter((current) => {
      if (!current) return current;

      return {
        ...current,
        name: newName,
      };
    });
  }

  return (
    <CharacterContext.Provider
      value={{
        character,
        isLoading,
        completeSession,
        updateName,
        reloadCharacter,
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
  if (!context.character && !context.isLoading) {
    return context as CharacterContextValue & { character: Character };
  }
  return context as CharacterContextValue & { character: Character };
}
