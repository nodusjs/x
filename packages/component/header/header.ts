import { Hidden } from "@mixin";
import { define } from "@nodusjs/std/directive";
import { paint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";

@define("x-header")
@paint(component, style)
class Header extends Echo(Hidden(HTMLElement)) {
  #internals;

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Header;
