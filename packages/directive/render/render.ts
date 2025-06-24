import { Hidden, Template } from "@mixin";
import { define } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { interpolate } from "./interpolate";
import { style } from "./style";

@define("x-render")
@paint(component, style)
class Render extends Echo(Hidden(Template(HTMLElement))) {
  #innerHTML;
  #internals;

  get innerHTML() {
    return (this.#innerHTML ??= "");
  }

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  @repaint
  render(payload) {
    requestAnimationFrame(() => {
      this.#innerHTML = []
        .concat(payload)
        .map((data) => interpolate(super.template, data))
        .join("");
    });
    return this;
  }
}

export default Render;
