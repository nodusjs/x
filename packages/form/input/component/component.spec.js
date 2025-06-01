import { describe, expect, it } from "vitest";
import { component } from "./component.js";

describe("component", () => {
  it("should generate the expected HTML string for default input", () => {
    const input = {
      id: "",
      inputMode: "",
      max: "",
      maxLength: "",
      min: "",
      minLength: "",
      name: "",
      type: "",
      value: "",
      readonly: false,
      required: false,
    };

    const html = component(input);
    expect(html).toMatchSnapshot();
  });

  it("should include attributes when properties are set", () => {
    const input = {
      id: "email",
      inputMode: "numeric",
      max: "100",
      maxLength: "10",
      min: "1",
      minLength: "1",
      name: "age",
      type: "number",
      value: "42",
      readonly: true,
      required: true,
    };

    const html = component(input);
    expect(html).toMatchSnapshot();
  });
});
