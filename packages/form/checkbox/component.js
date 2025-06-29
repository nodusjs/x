import { html } from "@nodusjs/std/dom";

export const component = (checkbox) => html`
  <input
    type="checkbox"
    ${checkbox.id ? `id="${checkbox.id}"` : ""}
    ${checkbox.name ? `name="${checkbox.name}"` : ""}
    ${checkbox.checked ? "checked" : ""}
    ${checkbox.disabled ? "disabled" : ""}
    ${checkbox.readonly ? "readonly" : ""}
    ${checkbox.required ? "required" : ""}
  />
  <wrap>
    <label for="${checkbox.id}">
      <slot name="label"></slot>
    </label>
    <slot name="validity"></slot>
  </wrap>
`;
