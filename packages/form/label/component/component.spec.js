import { describe, expect, it } from "vitest";
import { component } from "./component.js";

describe("component", () => {
  it("deve gerar exatamente um <slot> para projeção do conteúdo filho", () => {
    const html = component();
    expect(html).toMatchSnapshot();
  });
});
