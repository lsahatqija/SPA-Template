import { describe, expect, it } from "vitest";

import { greetingSchema } from "./greeting";

describe("greetingSchema", () => {
  it("accepts the public greeting contract", () => {
    expect(greetingSchema.parse({ message: "Hello", source: "development-api" })).toEqual({
      message: "Hello",
      source: "development-api",
    });
  });

  it("rejects malformed responses", () => {
    expect(() => greetingSchema.parse({ message: "", source: "unknown" })).toThrow();
  });
});
