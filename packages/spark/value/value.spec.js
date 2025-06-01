import { describe, expect, it } from "vitest";
import { value } from "./value.js";

describe("value", () => {
  it("deve retornar o valor de `event.target.value`", () => {
    const event = { target: { value: "foo" } };
    const output = value(event);
    expect(output).toBe("foo");
  });
});
