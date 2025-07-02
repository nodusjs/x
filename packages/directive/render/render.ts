import { Hidden, Template } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { content } from "./interface";
import { interpolate } from "./interpolate";
import { style } from "./style";

@define("x-render")
@paint(component, style)
class Render extends Echo(Hidden(Template(HTMLElement))) {
  #content;
  #internals;
  #gap;

  get [content]() {
    return (this.#content ??= "");
  }

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  get gap() {
    return (this.#gap ??= "2xl");
  }

  @attributeChanged("gap")
  @retouch
  set gap(value) {
    this.#gap = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  @repaint
  render(payload) {
    requestAnimationFrame(() => {
      this.#content = []
        .concat(payload)
        .map((data) => interpolate(super.template, data))
        .join("");
    });
    return this;
  }
}

export default Render;
