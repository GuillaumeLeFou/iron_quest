import { mockCharacter } from "@/mocks/character";
import { Character } from "@/types/character";

export async function getCharacter(): Promise<Character> {
  return Promise.resolve(mockCharacter);
}

export async function saveCharacter(character: Character): Promise<void> {
  
}