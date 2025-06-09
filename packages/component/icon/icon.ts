import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { repaint, retouch } from "nodusjs/std/dom";

@define("x-icon")
class Icon extends Echo(HTMLElement) {
  #size;
  #use;

  get size() {
    return (this.#size ??= "md");
  }

  @attributeChanged("size")
  @retouch
  set size(value) {
    this.#size = value;
  }

  get use() {
    return (this.#use ??= "");
  }

  @attributeChanged("use")
  @repaint
  set use(value) {
    this.#use = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }
}

export default Icon;
