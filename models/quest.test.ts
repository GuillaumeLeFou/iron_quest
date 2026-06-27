import { Quest } from "@/types/quest";
import { getQuestStatus } from "./quest";

function createTestQuest(overrides: Partial<Quest> = {}): Quest {
  return {
    id: "quest-1",
    title: "title",
    description: "description",
    progression: 0,
    goal: 10,
    ...overrides,
  };
}

describe("getQuestStatus", () => {
  it("should return not_started when progression is 0", () => {
    expect(
      getQuestStatus(
        createTestQuest({
          progression: 0,
        }),
      ),
    ).toBe("not_started");
  });

  it("should return in_progress when progression is greater than 0 but below the goal", () => {
    expect(
      getQuestStatus(
        createTestQuest({
          progression: 5,
        }),
      ),
    ).toBe("in_progress");
  });

  it("should return in_progress when progression is just below the goal", () => {
    expect(
      getQuestStatus(
        createTestQuest({
          progression: 9,
        }),
      ),
    ).toBe("in_progress");
  });

  it("should return completed when progression equals the goal", () => {
    expect(
      getQuestStatus(
        createTestQuest({
          progression: 10,
        }),
      ),
    ).toBe("completed");
  });

  it("should return completed when progression is greater than the goal", () => {
    expect(
      getQuestStatus(
        createTestQuest({
          progression: 15,
        }),
      ),
    ).toBe("completed");
  });
});
