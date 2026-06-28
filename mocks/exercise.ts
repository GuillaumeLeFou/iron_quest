import { Exercise } from "@/types/exercise";

export const mockExercises: Exercise[] = [
  {
    id: "exercise-1",
    name: "Pompe",
    description:
      "Placez les mains légèrement plus larges que les épaules. Descendez en pliant les coudes jusqu'à ce que la poitrine soit proche du sol, puis poussez pour revenir à la position de départ en gardant le corps bien aligné.",
    equipment: "bodyweight",
    allowsAddedWeight: true,
  },
  {
    id: "exercise-2",
    name: "Curl aux haltère",
    description:
      "Debout, un haltère dans chaque main, gardez les coudes près du corps. Pliez les bras pour monter les haltères jusqu'aux épaules, puis redescendez lentement en contrôlant le mouvement.",
    equipment: "dumbbell",
  },
  {
    id: "exercise-3",
    name: "Course à pied",
    description:
      "Courez à une allure adaptée à l'objectif en gardant une posture droite, une foulée fluide et une respiration régulière.",
    trackDistance: true,
  },
  {
    id: "exercise-4",
    name: "Corde à sauter",
    description:
      "Sautez à un rythme régulier en effectuant de petits rebonds et faites tourner la corde avec les poignets tout en gardant le buste droit.",
    trackDistance: false,
  },
];
