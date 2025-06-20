import { Hidden } from "@mixin";
import { define } from "@nodusjs/std/directive";
import { paint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";

@define("x-footer")
@paint(component, style)
class Footer extends Echo(Hidden(HTMLElement)) {
  #internals;

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Footer;
