import { emitter, hideble } from "@interface";
import { around } from "@middleware";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { uuid } from "./uuid";

@define("x-dataset")
class Dataset extends Echo(HTMLElement) {
  #upsert;
  #map = new Map();

  get upsert() {
    return this.#upsert;
  }

  @attributeChanged("upsert")
  set upsert(value) {
    this.#upsert = value;
  }

  get value() {
    return [...this.#map.values()];
  }

  @around(emitter)
  delete(key) {
    this.#map.delete(key);
    return this;
  }

  [emitter]() {
    const init = { bubbles: true, cancelable: true, detail: this.value };
    const event = new CustomEvent("change", init);
    this.dispatchEvent(event);
    return this;
  }

  @connected
  [hideble]() {
    this.style.setProperty("display", "none");
    return this;
  }

  @around(emitter)
  push(payload) {
    const key = payload[this.upsert] ?? uuid();
    const value = this.#map.get(key) ?? {};
    this.#map.set(key, { ...value, ...payload, [this.upsert]: key });
    return this;
  }

  @around(emitter)
  reset() {
    this.#map.clear();
    return this;
  }
}

export default Dataset;
