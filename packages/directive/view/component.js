import { html } from "@nodusjs/std/dom";
import { textContent } from "./interface";

export const component = (view) => html`${view[textContent]}`;
