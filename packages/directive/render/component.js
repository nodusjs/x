import { html } from "@nodusjs/std/dom";

export const component = (render) => html`${render.innerHTML}`;
