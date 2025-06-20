import { around } from "@middleware";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { render, textContent } from "./interface";
import { request } from "./request";
import { style } from "./style";

@define("x-include")
@paint(component, style)
class Include extends Echo(HTMLElement) {
  #src;
  #textContent;

  get src() {
    return (this.#src ??= "");
  }

  @attributeChanged("src")
  @around(render)
  set src(value) {
    this.#src = value;
  }

  get [textContent]() {
    return (this.#textContent ??= "");
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  @repaint
  async [render]() {
    this.#textContent = await request(this.src);
    return this;
  }
}

export default Include;
