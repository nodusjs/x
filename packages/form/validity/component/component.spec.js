import { describe, expect, it } from "vitest";
import { component } from "./component.js";

describe("component", () => {
  it("deve gerar um slot para projeção de mensagens", () => {
    const html = component();
    expect(html).toMatchSnapshot();
  });
});
