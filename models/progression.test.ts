import { getNewLevel, getXpRequiredForLevel } from "./progression";

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

  it("should throw an error for level 0", () => {
    expect(() => getXpRequiredForLevel(0)).toThrow(
      "Level must be at least 1, received: " + 0,
    );
  });

  it("should throw an error for negative levels", () => {
    expect(() => getXpRequiredForLevel(-5)).toThrow(
      "Level must be at least 1, received: " + -5,
    );
  });
});

describe("getNewLevel", () => {
  it("should throw an error when level is invalid", () => {
    expect(() => getNewLevel(0, 100)).toThrow();
  });

  it("should not level up if xp is insufficient", () => {
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

  it("should keep remaining xp after leveling up", () => {
    expect(getNewLevel(1, 180)).toEqual({
      newLevel: 2,
      remainingXp: 30,
    });
  });

  it("should level up twice", () => {
    expect(getNewLevel(1, 350)).toEqual({
      newLevel: 3,
      remainingXp: 0,
    });
  });

  it("should level up twice and keep remaining xp", () => {
    expect(getNewLevel(1, 400)).toEqual({
      newLevel: 3,
      remainingXp: 50,
    });
  });

  it("should return the same level when xp is zero", () => {
    expect(getNewLevel(5, 0)).toEqual({
      newLevel: 5,
      remainingXp: 0,
    });
  });

  it("should handle a large amount of xp", () => {
    expect(getNewLevel(3, 900)).toEqual({
      newLevel: 6,
      remainingXp: 0,
    });
  });
});
