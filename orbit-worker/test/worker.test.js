import { describe, it, expect } from "vitest";
import { drain } from "../src/worker.js";

describe("drain", () => {
  it("summarizes a batch", () => {
    expect(drain([1, 2, 3])).toEqual({ drained: 3, empty: false });
    expect(drain([])).toEqual({ drained: 0, empty: true });
  });
});
