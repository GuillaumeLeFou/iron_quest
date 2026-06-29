import { getEstimatedOneRepMax, isNewPersonalRecord } from "./workout";

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
