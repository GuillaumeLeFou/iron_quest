import { WorkoutSession } from "@/types/workout";
import {
  getBestOneRepMax,
  getEstimatedOneRepMax,
  isNewPersonalRecord,
} from "./workout";

function createTestSession(
  exerciseId: string,
  sets: { weight: number; reps: number }[],
): WorkoutSession {
  return {
    id: "session-1",
    templateId: "template-1",
    date: "2026-01-01",
    duration: 3600,
    notes: "",
    exercises: [
      {
        type: "strength",
        exerciseId,
        sets,
      },
    ],
  };
}

describe("getEstimatedOneRepMax", () => {
  it("should return the same weight for 0 reps", () => {
    expect(getEstimatedOneRepMax(100, 0)).toBe(100);
  });

  it("should correctly estimate the one rep max", () => {
    expect(getEstimatedOneRepMax(150, 5)).toBe(175);
  });

  it("should correctly estimate with 10 reps", () => {
    expect(getEstimatedOneRepMax(120, 10)).toBe(160);
  });

  it("should return 0 when weight is 0", () => {
    expect(getEstimatedOneRepMax(0, 10)).toBe(0);
  });

  it("should correctly estimate with 1 rep", () => {
    expect(getEstimatedOneRepMax(90, 1)).toBeCloseTo(93);
  });
});

describe("isNewPersonalRecord", () => {
  it("should return true when the estimated 1RM is greater than the current record", () => {
    expect(isNewPersonalRecord(150, 5, 170)).toBe(true);
  });

  it("should return false when the estimated 1RM is lower than the current record", () => {
    expect(isNewPersonalRecord(150, 5, 180)).toBe(false);
  });

  it("should return false when the estimated 1RM is equal to the current record", () => {
    expect(isNewPersonalRecord(150, 5, 175)).toBe(false);
  });
});

describe("getBestOneRepMax", () => {
  it("should return 0 when there are no sessions", () => {
    expect(getBestOneRepMax("bench", [])).toBe(0);
  });

  it("should return 0 when the exercise is not found", () => {
    const sessions = [createTestSession("squat", [{ weight: 150, reps: 5 }])];

    expect(getBestOneRepMax("bench", sessions)).toBe(0);
  });

  it("should return the best one rep max for one session", () => {
    const sessions = [
      createTestSession("bench", [
        { weight: 100, reps: 5 }, // 116.66...
        { weight: 150, reps: 5 }, // 175
      ]),
    ];

    expect(getBestOneRepMax("bench", sessions)).toBe(175);
  });

  it("should return the best one rep max across multiple sessions", () => {
    const sessions = [
      createTestSession("bench", [{ weight: 100, reps: 5 }]),
      createTestSession("bench", [{ weight: 150, reps: 5 }]),
    ];

    expect(getBestOneRepMax("bench", sessions)).toBe(175);
  });

  it("should ignore exercises with another exerciseId", () => {
    const sessions = [
      createTestSession("squat", [{ weight: 200, reps: 5 }]),
      createTestSession("bench", [{ weight: 150, reps: 5 }]),
    ];

    expect(getBestOneRepMax("bench", sessions)).toBe(175);
  });
});
