import { describe, expect, it, vi } from "vitest";
import { prevent } from "./prevent.js";

describe("prevent", () => {
  it("deve chamar preventDefault no evento e retornar o próprio evento", () => {
    const fakeEvent = { preventDefault: vi.fn() };
    const returned = prevent(fakeEvent);
    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(returned).toBe(fakeEvent);
  });
});
