import { define } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import { component } from "./component";
import { render, textContent } from "./interface";
import { style } from "./style";

@define("x-view")
@paint(component, style)
class View extends HTMLElement {
  #textContent;

  get [textContent]() {
    return (this.#textContent ??= "");
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  @repaint
  [render](text) {
    this.#textContent = text;
    return this;
  }
}

export default View;
