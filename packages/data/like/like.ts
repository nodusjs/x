import { around } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { dispatch } from "./interface";

@define("x-like")
class Like extends Echo(Headless(HTMLElement)) {
  #key;
  #value;

  get key() {
    return this.#key;
  }

  @attributeChanged("key")
  set key(value) {
    this.#key = value;
  }

  get value() {
    return (this.#value ??= "");
  }

  @attributeChanged("value")
  @around(dispatch)
  set value(value) {
    this.#value = value;
  }

  async [dispatch]() {
    await customElements.whenDefined(this.parentElement?.localName);
    const detail = this.parentElement.value.filter(({ [this.key]: value }) =>
      value.toLowerCase().includes(this.value.toLowerCase()),
    );
    const init = { bubbles: true, cancelable: true, detail };
    const event = new CustomEvent("like", init);
    this.parentElement.dispatchEvent(event);
    return this;
  }
}

export default Like;
