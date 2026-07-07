import {
  applyDecay,
  applyDisciplineDecay,
  applyEnduranceDecay,
  applyStrengthDecay,
  applyVitalityDecay,
  calculateDiscipline,
  calculateEndurance,
  calculateStrength,
  calculateVitality,
  getNewLevel,
  getXpPercentage,
  getXpRequiredForLevel,
} from "./progression";

import { Exercise } from "@/types/exercise";
import { WorkoutSession } from "@/types/workout";
import {
  getCompletedTrainingWeeks,
  getDaysSinceLastWorkout,
} from "@/utils/date";
import { getTotalVolume } from "./workout";

jest.mock("./workout", () => ({
  getTotalVolume: jest.fn(),
}));

jest.mock("@/utils/date", () => ({
  getCompletedTrainingWeeks: jest.fn(),
  getDaysSinceLastWorkout: jest.fn(),
}));

const mockedGetTotalVolume = getTotalVolume as jest.Mock;
const mockedGetCompletedTrainingWeeks = getCompletedTrainingWeeks as jest.Mock;
const mockedGetDaysSinceLastWorkout = getDaysSinceLastWorkout as jest.Mock;

describe("getXpRequiredForLevel", () => {
  it("should return 150 xp for level 1", () => {
    expect(getXpRequiredForLevel(1)).toBe(150);
  });

  it("should return 200 xp for level 2", () => {
    expect(getXpRequiredForLevel(2)).toBe(200);
  });

  it("should return 600 xp for level 10", () => {
    expect(getXpRequiredForLevel(10)).toBe(600);
  });

  it("should throw an error for invalid level", () => {
    expect(() => getXpRequiredForLevel(0)).toThrow(
      "Level must be at least 1, received: 0",
    );
  });
});

describe("getNewLevel", () => {
  it("should not level up with insufficient xp", () => {
    expect(getNewLevel(1, 100)).toEqual({
      newLevel: 1,
      remainingXp: 100,
    });
  });

  it("should level up with exact xp", () => {
    expect(getNewLevel(1, 150)).toEqual({
      newLevel: 2,
      remainingXp: 0,
    });
  });

  it("should keep remaining xp after leveling", () => {
    expect(getNewLevel(1, 180)).toEqual({
      newLevel: 2,
      remainingXp: 30,
    });
  });

  it("should level up multiple times", () => {
    expect(getNewLevel(1, 350)).toEqual({
      newLevel: 3,
      remainingXp: 0,
    });
  });
});

describe("getXpPercentage", () => {
  it("should return 0 with no xp", () => {
    expect(getXpPercentage(1, 0)).toBe(0);
  });

  it("should return percentage correctly", () => {
    expect(getXpPercentage(1, 75)).toBe(50);
  });

  it("should cap percentage at 100", () => {
    expect(getXpPercentage(1, 200)).toBe(100);
  });
});

describe("calculateStrength", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 0 with no volume", () => {
    mockedGetTotalVolume.mockReturnValue(0);

    expect(calculateStrength([])).toBe(0);
  });

  it("should calculate strength progression", () => {
    mockedGetTotalVolume.mockReturnValue(3000000);

    expect(calculateStrength([])).toBe(63);
  });
});

describe("calculateEndurance", () => {
  it("should return 0 without cardio", () => {
    expect(calculateEndurance([], [])).toBe(0);
  });

  it("should calculate endurance with distance", () => {
    const exercises = [
      {
        id: "running",
        name: "Course",
        description: "",
        trackDistance: true,
        enduranceCoefficient: 2,
        distanceMultiplier: 1.5,
      },
    ] as Exercise[];

    const sessions = [
      {
        id: "1",
        templateId: "1",
        date: "2026-01-01",
        duration: 3600,
        notes: "",
        exercises: [
          {
            type: "cardio",
            exerciseId: "running",
            duration: 36000,
            distance: 100,
          },
        ],
      },
    ] as WorkoutSession[];

    expect(calculateEndurance(sessions, exercises)).toBe(9);
  });

  it("should calculate endurance without distance", () => {
    const exercises = [
      {
        id: "rope",
        name: "Corde",
        description: "",
        trackDistance: false,
        enduranceCoefficient: 2,
        distanceMultiplier: 0,
      },
    ] as Exercise[];

    const sessions = [
      {
        id: "1",
        templateId: "1",
        date: "2026-01-01",
        duration: 3600,
        notes: "",
        exercises: [
          {
            type: "cardio",
            exerciseId: "rope",
            duration: 36000,
            distance: 100,
          },
        ],
      },
    ] as WorkoutSession[];

    expect(calculateEndurance(sessions, exercises)).toBe(8);
  });
});

describe("calculateVitality", () => {
  it("should return 0 without sessions", () => {
    expect(calculateVitality([])).toBe(0);
  });

  it("should calculate vitality", () => {
    expect(calculateVitality(Array(300).fill({}))).toBe(63);
  });
});

describe("calculateDiscipline", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate discipline", () => {
    mockedGetCompletedTrainingWeeks.mockReturnValue(52);

    expect(calculateDiscipline([])).toBe(63);
  });
});

describe("applyStrengthDecay", () => {
  it("should not decay during grace period", () => {
    mockedGetDaysSinceLastWorkout.mockReturnValue(20);

    expect(applyStrengthDecay(100, [])).toBe(100);
  });

  it("should decay after grace period", () => {
    mockedGetDaysSinceLastWorkout.mockReturnValue(60);

    expect(applyStrengthDecay(100, [])).toBeLessThan(100);
  });
});

describe("applyEnduranceDecay", () => {
  it("should not decay during grace period", () => {
    mockedGetDaysSinceLastWorkout.mockReturnValue(10);

    expect(applyEnduranceDecay(100, [])).toBe(100);
  });

  it("should decay after grace period", () => {
    mockedGetDaysSinceLastWorkout.mockReturnValue(30);

    expect(applyEnduranceDecay(100, [])).toBeLessThan(100);
  });
});

describe("applyVitalityDecay", () => {
  it("should not decay during grace period", () => {
    mockedGetDaysSinceLastWorkout.mockReturnValue(5);

    expect(applyVitalityDecay(100, [])).toBe(100);
  });

  it("should decay after grace period", () => {
    mockedGetDaysSinceLastWorkout.mockReturnValue(20);

    expect(applyVitalityDecay(100, [])).toBeLessThan(100);
  });
});

describe("applyDisciplineDecay", () => {
  it("should not decay before 2 inactive weeks", () => {
    mockedGetDaysSinceLastWorkout.mockReturnValue(14);

    expect(applyDisciplineDecay(80, [])).toBe(80);
  });

  it("should reduce discipline after inactivity", () => {
    mockedGetDaysSinceLastWorkout.mockReturnValue(35);

    expect(applyDisciplineDecay(80, [])).toBe(77);
  });
});

describe("applyDecay", () => {
  it("should not decay during grace period", () => {
    expect(applyDecay(100, 10, 30, 0.01)).toBe(100);
  });

  it("should decay after grace period", () => {
    expect(applyDecay(100, 60, 30, 0.01)).toBe(99);
  });

  it("should round correctly", () => {
    expect(applyDecay(100, 60, 30, 0.05)).toBe(95);
  });

  it("should handle zero stat", () => {
    expect(applyDecay(0, 100, 30, 0.05)).toBe(0);
  });
});
