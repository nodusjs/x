import { html } from "@nodusjs/std/dom";
import { textContent } from "./interface";

export const component = (include) => html`${include[textContent]}`;
