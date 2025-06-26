import { html } from "@nodusjs/std/dom";

export const component = (textarea) => html`
  <input
    type="checkbox"
    ${textarea.id ? `id="${textarea.id}"` : ""}
    ${textarea.name ? `name="${textarea.name}"` : ""}
    ${textarea.checked ? "checked" : ""}
    ${textarea.disabled ? "disabled" : ""}
    ${textarea.readonly ? "readonly" : ""}
    ${textarea.required ? "required" : ""}
  />
  <wrap>
    <label for="${textarea.id}">
      <slot name="label"></slot>
    </label>
    <slot name="validity"></slot>
  </wrap>
`;
