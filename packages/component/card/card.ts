import { Height, Hidden, Width } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";

@define("x-card")
@paint(component, style)
class Card extends Echo(Height(Hidden(Width(HTMLElement)))) {
  #internals;
  #spacing;

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  get spacing() {
    return (this.#spacing ??= "2xl");
  }

  @attributeChanged("spacing")
  @retouch
  set spacing(value) {
    this.#spacing = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Card;
