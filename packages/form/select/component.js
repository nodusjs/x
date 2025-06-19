import { html } from "@nodusjs/std/dom";

export const component = (select) => html`
  <label for="${select.id}">
    <slot name="label"></slot>
  </label>
  <wrap>
    <select
      ${select.id ? `id="${select.id}"` : ""}
      ${select.name ? `name="${select.name}"` : ""}
      ${select.value ? `value="${select.value}"` : ""}
      ${select.readonly ? "readonly" : ""}
      ${select.required ? "required" : ""}
    />
      <option></option>
    </select>
    <x-icon use="keyboard_arrow_down"></x-icon>
  </wrap>
  <slot name="validity"></slot>
`;
