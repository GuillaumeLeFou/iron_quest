import {
  getCompletedTrainingWeeks,
  getDaysSinceLastWorkout,
  getWeekNumber,
} from "./date";

import { WorkoutSession } from "@/types/workout";

function createTestSession(date: string): WorkoutSession {
  return {
    id: "session-1",
    templateId: "template-1",
    date,
    duration: 3600,
    notes: "",
    exercises: [],
  };
}

describe("getWeekNumber", () => {
  it("should return week 1 for beginning of year", () => {
    expect(getWeekNumber(new Date("2026-01-01"))).toBe(1);
  });
});

describe("getCompletedTrainingWeeks", () => {
  it("should return 0 without sessions", () => {
    expect(getCompletedTrainingWeeks([])).toBe(0);
  });

  it("should count unique weeks", () => {
    expect(
      getCompletedTrainingWeeks([
        createTestSession("2026-01-05"),
        createTestSession("2026-01-07"),
        createTestSession("2026-01-12"),
      ]),
    ).toBe(2);
  });
});

describe("getDaysSinceLastWorkout", () => {
  it("should return 0 without sessions", () => {
    expect(getDaysSinceLastWorkout([])).toBe(0);
  });

  it("should return days since last workout", () => {
    const sessions = [
      createTestSession(new Date(Date.now() - 10 * 86400000).toISOString()),
    ];

    expect(getDaysSinceLastWorkout(sessions)).toBe(10);
  });
});
