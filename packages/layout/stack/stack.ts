import { hideble } from "@interface";
import { after } from "@middleware";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { truthy } from "@nodusjs/std/spark";
import { size } from "@spark";
import { component } from "./component";
import { style } from "./style";

@define("x-stack")
@paint(component, style)
class Stack extends Echo(HTMLElement) {
  #align;
  #direction;
  #height;
  #hidden;
  #justify;
  #gap;
  #width;

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

  get height() {
    return (this.#height ??= "auto");
  }

  @attributeChanged("height", size)
  @retouch
  set height(value) {
    this.#height = value;
  }

  get hidden() {
    return (this.#hidden ??= false);
  }

  @attributeChanged("hidden", truthy)
  @after(hideble)
  set hidden(value) {
    this.#hidden = value;
  }

  get justify() {
    return (this.#justify ??= "flex-start");
  }

  @attributeChanged("justify")
  @retouch
  set justify(value) {
    this.#justify = value;
  }

  get width() {
    return (this.#width ??= "auto");
  }

  @attributeChanged("width", size)
  @retouch
  set width(value) {
    this.#width = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  [hideble]() {
    this.hidden
      ? this.style.setProperty("display", "none")
      : this.style.removeProperty("display");
    return this;
  }
}

export default Stack;
