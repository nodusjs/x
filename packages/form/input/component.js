import { html } from "@nodusjs/std/dom";

export const component = (input) => html`
  <label for="${input.id}">
    <slot name="label"></slot>
  </label>
  <input
    ${input.id ? `id="${input.id}"` : ""}
    ${input.inputMode ? `inputmode="${input.inputMode}"` : ""}
    ${input.max ? `max="${input.max}"` : ""}
    ${input.maxLength ? `maxlength="${input.maxLength}"` : ""}
    ${input.min ? `min="${input.min}"` : ""}
    ${input.minLength ? `minlength="${input.minLength}"` : ""}
    ${input.name ? `name="${input.name}"` : ""}
    ${input.placeholder ? `placeholder="${input.placeholder}"` : ""}
    ${input.type ? `type="${input.type}"` : ""}
    ${input.value ? `value="${input.value}"` : ""}
    ${input.readonly ? "readonly" : ""}
    ${input.required ? "required" : ""}
  />
  <slot name="validity"></slot>
`;
