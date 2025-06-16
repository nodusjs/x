import { describe, expect, it } from "vitest";
import { style } from "./style.js";

describe("style", () => {
  it("gera o bloco de styles CSS esperado", () => {
    const {
      cssRules: [{ cssText }],
    } = style();
    expect(cssText).toMatchSnapshot();
  });
});
