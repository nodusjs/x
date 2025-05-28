import { beforeEach, describe, expect, it, vi } from "vitest";

describe("setImmediate polyfill", () => {
  beforeEach(() => {
    delete globalThis.setImmediate;
    vi.resetModules();
  });

  it("não deve sobrescrever setImmediate se já existir", async () => {
    const original = vi.fn();
    globalThis.setImmediate = original;

    await import("./setImmediate.js");

    expect(globalThis.setImmediate).toBe(original);
  });

  it("deve executar a função passada", async () => {
    await import("./setImmediate.js");
    const callback = vi.fn();

    globalThis.setImmediate(callback);

    await new Promise((r) => setTimeout(r, 5));

    expect(callback).toHaveBeenCalled();
  });
});
