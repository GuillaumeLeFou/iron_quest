import { mockCharacter } from "@/mocks/character";
import { getNewLevel } from "@/models/progression";
import { Character } from "@/types/character";
import { createContext, useContext, useState } from "react";

interface CharacterContextValue {
  character: Character;
  addXp: (xpGained: number) => void;
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character>(mockCharacter);

  function addXp(xpGained: number) {
    // 1. Calculer le nouveau niveau et l'XP restante avec getNewLevel
    // 2. Mettre à jour le character avec setCharacter
    // 3. Si newLevel > character.level → afficher un message (console.log pour l'instant)
    const { newLevel, remainingXp } = getNewLevel(
      character.level,
      character.xp + xpGained,
    );
    if (newLevel > character.level) {
      console.log(`Level up ! ${character.level} → ${newLevel}`);
    }
    setCharacter({ ...character, level: newLevel, xp: remainingXp });
  }

  return (
    <CharacterContext.Provider value={{ character, addXp }}>
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
