import { html } from "@nodusjs/std/dom";

export const component = (form) =>
  html`
    <form>
      ${form.template}
    </form>
  `;
