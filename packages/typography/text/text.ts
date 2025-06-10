import { Hidden } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { truthy } from "@nodusjs/std/spark";
import { component } from "./component";
import { style } from "./style";

@define("x-text")
@paint(component, style)
class Text extends Echo(Hidden(HTMLElement)) {
  #align;
  #as;
  #color;
  #onBrand;
  #size;
  #weight;
  #wrap;

  get align() {
    return (this.#align ??= "left");
  }

  @attributeChanged("align")
  @retouch
  set align(value) {
    this.#align = value;
  }

  get as() {
    return (this.#as ??= "p");
  }

  @attributeChanged("as")
  @repaint
  set as(value) {
    this.#as = value;
  }

  get color() {
    return (this.#color ??= "primary");
  }

  @attributeChanged("color")
  @retouch
  set color(value) {
    this.#color = value;
  }

  get onBrand() {
    return (this.#onBrand ??= false);
  }

  @attributeChanged("on-brand", truthy)
  @retouch
  set onBrand(value) {
    this.#onBrand = value;
  }

  get size() {
    return (this.#size ??= "md");
  }

  @attributeChanged("size")
  @retouch
  set size(value) {
    this.#size = value;
  }

  get weight() {
    return (this.#weight ??= "medium");
  }

  @attributeChanged("weight")
  @retouch
  set weight(value) {
    this.#weight = value;
  }

  get wrap() {
    return (this.#wrap ??= "wrap");
  }

  @attributeChanged("wrap")
  @retouch
  set wrap(value) {
    this.#wrap = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }
}

export default Text;
