import { Height, Hidden, Width } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";

@define("x-stack")
@paint(component, style)
class Stack extends Echo(Hidden(Height(Width(HTMLElement)))) {
  #align;
  #direction;
  #justify;
  #gap;

  get align() {
    return (this.#align ??= "start");
  }

  @attributeChanged("align")
  @retouch
  set align(value) {
    this.#align = value;
  }

  get direction() {
    return (this.#direction ??= "row");
  }

  @attributeChanged("direction")
  @retouch
  set direction(value) {
    this.#direction = value;
  }

  get gap() {
    return (this.#gap ??= "lg");
  }

  @attributeChanged("gap")
  @retouch
  set gap(value) {
    this.#gap = value;
  }

  get justify() {
    return (this.#justify ??= "flex-start");
  }

  @attributeChanged("justify")
  @retouch
  set justify(value) {
    this.#justify = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Stack;
