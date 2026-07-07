import {
  Achievement,
  AchievementCategory,
  AchievementRarity,
} from "@/types/achievement";

export const mockAchievements: Achievement[] = [
  // =========================
  // STRENGTH
  // =========================
  {
    id: "strength_1",
    name: "Premiers Pas",
    description: "Soulever un total de 10 000 kg.",
    category: AchievementCategory.STRENGTH,
    rarity: AchievementRarity.COMMON,
    objective: 10_000,
  },
  {
    id: "strength_2",
    name: "Costaud",
    description: "Soulever un total de 100 000 kg.",
    category: AchievementCategory.STRENGTH,
    rarity: AchievementRarity.UNCOMMON,
    objective: 100_000,
  },
  {
    id: "strength_3",
    name: "Titan",
    description: "Soulever un total de 1 000 000 kg.",
    category: AchievementCategory.STRENGTH,
    rarity: AchievementRarity.RARE,
    objective: 1_000_000,
  },
  {
    id: "strength_4",
    name: "Colosse",
    description: "Soulever un total de 10 000 000 kg.",
    category: AchievementCategory.STRENGTH,
    rarity: AchievementRarity.LEGENDARY,
    objective: 10_000_000,
  },

  // =========================
  // ENDURANCE
  // =========================
  {
    id: "endurance_1",
    name: "Premier Kilomètre",
    description: "Parcourir 10 km.",
    category: AchievementCategory.ENDURANCE,
    rarity: AchievementRarity.COMMON,
    objective: 10,
  },
  {
    id: "endurance_2",
    name: "Marathonien",
    description: "Parcourir 500 km.",
    category: AchievementCategory.ENDURANCE,
    rarity: AchievementRarity.UNCOMMON,
    objective: 500,
  },
  {
    id: "endurance_3",
    name: "Voyageur",
    description: "Parcourir 2 000 km.",
    category: AchievementCategory.ENDURANCE,
    rarity: AchievementRarity.RARE,
    objective: 2_000,
  },
  {
    id: "endurance_4",
    name: "Inarrêtable",
    description: "Parcourir 10 000 km.",
    category: AchievementCategory.ENDURANCE,
    rarity: AchievementRarity.LEGENDARY,
    objective: 10_000,
  },

  // =========================
  // VITALITY
  // =========================
  {
    id: "vitality_1",
    name: "Première Routine",
    description: "Terminer 10 séances.",
    category: AchievementCategory.VITALITY,
    rarity: AchievementRarity.COMMON,
    objective: 10,
  },
  {
    id: "vitality_2",
    name: "Habitué",
    description: "Terminer 100 séances.",
    category: AchievementCategory.VITALITY,
    rarity: AchievementRarity.UNCOMMON,
    objective: 100,
  },
  {
    id: "vitality_3",
    name: "Vétéran",
    description: "Terminer 500 séances.",
    category: AchievementCategory.VITALITY,
    rarity: AchievementRarity.RARE,
    objective: 500,
  },
  {
    id: "vitality_4",
    name: "Immortel",
    description: "Terminer 2 000 séances.",
    category: AchievementCategory.VITALITY,
    rarity: AchievementRarity.LEGENDARY,
    objective: 2_000,
  },

  // =========================
  // DISCIPLINE
  // =========================
  {
    id: "discipline_1",
    name: "Régulier",
    description: "Valider 10 semaines d'entraînement.",
    category: AchievementCategory.DISCIPLINE,
    rarity: AchievementRarity.COMMON,
    objective: 10,
  },
  {
    id: "discipline_2",
    name: "Déterminé",
    description: "Valider 52 semaines d'entraînement.",
    category: AchievementCategory.DISCIPLINE,
    rarity: AchievementRarity.UNCOMMON,
    objective: 52,
  },
  {
    id: "discipline_3",
    name: "Inébranlable",
    description: "Valider 104 semaines d'entraînement.",
    category: AchievementCategory.DISCIPLINE,
    rarity: AchievementRarity.RARE,
    objective: 104,
  },
  {
    id: "discipline_4",
    name: "Maître de la Discipline",
    description: "Valider 260 semaines d'entraînement.",
    category: AchievementCategory.DISCIPLINE,
    rarity: AchievementRarity.LEGENDARY,
    objective: 260,
  },

  // =========================
  // LEVEL
  // =========================
  {
    id: "level_10",
    name: "Aventurier",
    description: "Atteindre le niveau 10.",
    category: AchievementCategory.LEVEL,
    rarity: AchievementRarity.COMMON,
    objective: 10,
  },
  {
    id: "level_25",
    name: "Héros",
    description: "Atteindre le niveau 25.",
    category: AchievementCategory.LEVEL,
    rarity: AchievementRarity.UNCOMMON,
    objective: 25,
  },
  {
    id: "level_50",
    name: "Champion",
    description: "Atteindre le niveau 50.",
    category: AchievementCategory.LEVEL,
    rarity: AchievementRarity.RARE,
    objective: 50,
  },
  {
    id: "level_100",
    name: "Légende",
    description: "Atteindre le niveau 100.",
    category: AchievementCategory.LEVEL,
    rarity: AchievementRarity.LEGENDARY,
    objective: 100,
  },

  // =========================
  // STREAK
  // =========================
  {
    id: "streak_7",
    name: "En Feu",
    description: "Être actif pendant 7 jours consécutifs.",
    category: AchievementCategory.STREAK,
    rarity: AchievementRarity.COMMON,
    objective: 7,
  },
  {
    id: "streak_30",
    name: "Infatigable",
    description: "Être actif pendant 30 jours consécutifs.",
    category: AchievementCategory.STREAK,
    rarity: AchievementRarity.RARE,
    objective: 30,
  },

  // =========================
  // RECORD
  // =========================
  {
    id: "record_1",
    name: "Premier Record",
    description: "Battre un record personnel.",
    category: AchievementCategory.RECORD,
    rarity: AchievementRarity.COMMON,
    objective: 1,
  },
  {
    id: "record_25",
    name: "Collectionneur de Records",
    description: "Battre 25 records personnels.",
    category: AchievementCategory.RECORD,
    rarity: AchievementRarity.RARE,
    objective: 25,
  },

  // =========================
  // SPECIAL
  // =========================
  {
    id: "special_first_workout",
    name: "Le Début de l'Aventure",
    description: "Terminer ta première séance.",
    category: AchievementCategory.SPECIAL,
    rarity: AchievementRarity.COMMON,
    objective: 1,
  },
  {
    id: "special_first_cardio",
    name: "Premier Souffle",
    description: "Terminer ton premier entraînement cardio.",
    category: AchievementCategory.SPECIAL,
    rarity: AchievementRarity.COMMON,
    objective: 1,
  },
  {
    id: "special_first_pr",
    name: "Toujours Plus Haut",
    description: "Obtenir ton premier record personnel.",
    category: AchievementCategory.SPECIAL,
    rarity: AchievementRarity.UNCOMMON,
    objective: 1,
  },
  // =========================
  // EPIC
  // =========================

  {
    id: "strength_epic",
    name: "Force de la Montagne",
    description: "Soulever un total de 5 000 000 kg.",
    category: AchievementCategory.STRENGTH,
    rarity: AchievementRarity.EPIC,
    objective: 5_000_000,
  },

  {
    id: "endurance_epic",
    name: "Explorateur Infatigable",
    description: "Parcourir un total de 5 000 km.",
    category: AchievementCategory.ENDURANCE,
    rarity: AchievementRarity.EPIC,
    objective: 5_000,
  },

  {
    id: "vitality_epic",
    name: "Mode de Vie",
    description: "Terminer un total de 1 000 séances.",
    category: AchievementCategory.VITALITY,
    rarity: AchievementRarity.EPIC,
    objective: 1_000,
  },

  {
    id: "discipline_epic",
    name: "Volonté d'Acier",
    description: "Maintenir une discipline pendant 156 semaines.",
    category: AchievementCategory.DISCIPLINE,
    rarity: AchievementRarity.EPIC,
    objective: 156,
  },

  {
    id: "level_epic",
    name: "Maître d'Aventure",
    description: "Atteindre le niveau 75.",
    category: AchievementCategory.LEVEL,
    rarity: AchievementRarity.EPIC,
    objective: 75,
  },

  {
    id: "streak_epic",
    name: "Inarrêtable",
    description: "Être actif pendant 100 jours consécutifs.",
    category: AchievementCategory.STREAK,
    rarity: AchievementRarity.EPIC,
    objective: 100,
  },

  {
    id: "record_epic",
    name: "Chasseur de Records",
    description: "Battre 100 records personnels.",
    category: AchievementCategory.RECORD,
    rarity: AchievementRarity.EPIC,
    objective: 100,
  },

  {
    id: "special_epic",
    name: "Renaissance",
    description: "Revenir après une longue pause et retrouver une routine.",
    category: AchievementCategory.SPECIAL,
    rarity: AchievementRarity.EPIC,
    objective: 1,
  },
];
