import { Headless } from "@mixin";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import { connectArc, setter } from "./interface";

@define("x-on")
class On extends Headless(HTMLElement) {
  #value;

  get value() {
    return (this.#value ??= "");
  }

  @attributeChanged("value")
  set value(value) {
    this.#value = value;
  }

  @connected
  async [setter]() {
    await customElements.whenDefined(this.parentElement?.localName);
    this.parentElement?.[connectArc]?.(this.value);
    return this;
  }
}

export default On;
