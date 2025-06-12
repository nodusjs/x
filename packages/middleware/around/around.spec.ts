import { describe, expect, it } from "vitest";
import { around } from "./around.js";

describe("around decorator", () => {
  it("invoca o hook após o método original e retorna o valor original", () => {
    const calls = [];

    class Foo {
      @around("hook")
      multiply(x) {
        calls.push(`orig:${x}`);
        return 3 * x;
      }

      hook() {
        calls.push("hook");
        return this;
      }
    }

    const foo = new Foo();
    const result = foo.multiply(4);

    expect(result).toBe(12);
    expect(calls).toEqual(["orig:4", "hook"]);
  });

  it("preserva o comportamento de um setter e invoca o hook em torno dele", () => {
    const calls = [];

    class Bar {
      #value = 0;

      @around("hook")
      set value(x) {
        calls.push(`set:${x}`);
        this.#value = x;
      }

      get value() {
        return this.#value;
      }

      hook() {
        calls.push("hook");
        return this;
      }
    }

    const bar = new Bar();
    bar.value = 7;

    expect(bar.value).toBe(7);
    expect(calls).toEqual(["set:7", "hook"]);
  });
});
