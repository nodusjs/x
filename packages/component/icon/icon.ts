import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { repaint } from "nodusjs/std/dom";

@define("x-icon")
class Icon extends Echo(HTMLElement) {
  #use;

  get use() {
    return (this.#use ??= "");
  }

  @attributeChanged("use")
  @repaint
  set use(value) {
    this.#use = value;
  }
}

export default Icon;
