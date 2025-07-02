import { html } from "@nodusjs/std/dom";
import { content } from "./interface";

export const component = (render) => html`${render[content]}`;
