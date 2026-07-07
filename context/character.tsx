import { mockCharacter } from "@/mocks/character";
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
import { Character } from "@/types/character";
import { Exercise } from "@/types/exercise";
import { WorkoutSession } from "@/types/workout";
import { createContext, useContext, useState } from "react";

interface CharacterContextValue {
  character: Character;
  addXp: (xpGained: number) => void;
  updateCharacterStats: (
    sessions: WorkoutSession[],
    exercises: Exercise[],
  ) => void;
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character>(mockCharacter);

  function addXp(xpGained: number) {
    const { newLevel, remainingXp } = getNewLevel(
      character.level,
      character.xp + xpGained,
    );
    if (newLevel > character.level) {
      console.log(`Level up ! ${character.level} → ${newLevel}`);
    }
    setCharacter({ ...character, level: newLevel, xp: remainingXp });
  }

  function updateCharacterStats(
    sessions: WorkoutSession[],
    exercises: Exercise[],
  ) {
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

  return (
    <CharacterContext.Provider
      value={{ character, addXp, updateCharacterStats }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter(): CharacterContextValue {
  const context = useContext(CharacterContext);
  if (!context)
    throw new Error("useCharacter must be used within a CharacterProvider");
  return context;
}
