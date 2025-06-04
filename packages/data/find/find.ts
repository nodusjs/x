import { emitter, hideble } from "@interface";
import { around } from "@middleware";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";

@define("x-find")
class Find extends Echo(HTMLElement) {
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
    return this.#value;
  }

  @attributeChanged("value")
  @around(emitter)
  set value(value) {
    this.#value = value;
  }

  async [emitter]() {
    await customElements.whenDefined(this.parentElement?.localName);
    const detail = this.parentElement.value.find(
      (tuple) => tuple[this.key] === this.value,
    );
    const init = {
      bubbles: true,
      cancelable: true,
      detail,
    };
    const event = new CustomEvent("find", init);
    this.parentElement.dispatchEvent(event);
    return this;
  }

  @connected
  [hideble]() {
    this.style.setProperty("display", "none");
    return this;
  }
}

export default Find;
