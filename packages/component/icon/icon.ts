import { define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";

@define("x-icon")
class Icon extends Echo(HTMLElement) {
  #use;

  get use() {
    return (this.#use ??= "");
  }

  set use(value) {
    this.#use = value;
  }
}

export default Icon;
