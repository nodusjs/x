import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { around } from "./around.js";

describe("around decorator", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("invoca o hook após o método original e retorna o valor original", () => {
    const calls = [];
    class Foo {
      @around("hook")
      multiply(x) {
        calls.push(`orig:${x}`);
        return x * 3;
      }
      hook(x) {
        calls.push(`hook:${x}`);
      }
    }

    const foo = new Foo();
    const result = foo.multiply(4);

    expect(result).toBe(12);
    expect(calls).toEqual(["orig:4"]);

    vi.runAllTimers();
    expect(calls).toEqual(["orig:4", "hook:4"]);
  });

  it("preserva o comportamento de um setter e invoca o hook em torno dele", () => {
    const calls = [];
    class Bar {
      #value = 0;

      @around("onSet")
      set value(v) {
        calls.push(`set:${v}`);
        this.#value = v;
      }

      get value() {
        return this.#value;
      }

      onSet(v) {
        calls.push(`hook:${v}`);
      }
    }

    const bar = new Bar();
    bar.value = 7;

    expect(bar.value).toBe(7);
    expect(calls).toEqual(["set:7"]);

    vi.runAllTimers();
    expect(calls).toEqual(["set:7", "hook:7"]);
  });
});
