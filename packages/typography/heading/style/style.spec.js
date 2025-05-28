import { describe, expect, it } from "vitest";
import { style } from "./style.js";

describe("style", () => {
  it("gera o CSS esperado com valores padrão", () => {
    const text = {
      as: "h1",
      size: "md",
    };

    const {
      cssRules: [{ cssText }],
    } = style(text);
    expect(cssText).toMatchSnapshot();
  });
});
