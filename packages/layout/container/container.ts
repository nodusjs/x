import { Hidden } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";

@define("x-container")
@paint(component, style)
class Container extends Echo(Hidden(HTMLElement)) {
  #internals;

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Container;
