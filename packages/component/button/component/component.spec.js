import { describe, expect, it } from "vitest";
import { component } from "./component.js";

describe("component", () => {
  it("deve gerar a string HTML esperada", () => {
    const htmlString = component();
    expect(htmlString).toMatchSnapshot();
  });
});
