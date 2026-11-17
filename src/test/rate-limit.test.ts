import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit";

describe("rate limiter", () => {
  it("allows up to the limit, then blocks, per key", () => {
    const allow = createRateLimiter(3, 1000);
    expect([1, 2, 3, 4].map(() => allow("a", 0))).toEqual([true, true, true, false]);
    expect(allow("b", 0)).toBe(true);
  });

  it("resets after the window passes", () => {
    const allow = createRateLimiter(1, 1000);
    expect(allow("a", 0)).toBe(true);
    expect(allow("a", 500)).toBe(false);
    expect(allow("a", 1001)).toBe(true);
  });
});
