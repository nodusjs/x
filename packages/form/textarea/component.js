import { html } from "@nodusjs/std/dom";

export const component = (textarea) => html`
  <label for="${textarea.id}">
    <slot name="label"></slot>
  </label>
  <textarea
    ${textarea.id ? `id="${textarea.id}"` : ""}
    ${textarea.name ? `name="${textarea.name}"` : ""}
    ${textarea.value ? `value="${textarea.value}"` : ""}
    ${textarea.readonly ? "readonly" : ""}
    ${textarea.required ? "required" : ""}>${textarea.value}</textarea>
  <slot name="validity"></slot>
`;
