import { emitter, hideble } from "@interface";
import { after } from "@middleware";
import { attributeChanged, define } from "@nodusjs/std/directive";
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

  @after(emitter)
  delete(key) {
    this.#map.delete(key);
    return this;
  }

  [emitter]() {
    const init = { detail: this.value };
    const event = new CustomEvent("change", init);
    this.dispatchEvent(event);
    return this;
  }

  @connected
  [hideble]() {
    this.style.setProperty("display", "none");
    return this;
  }

  @after(emitter)
  push(payload) {
    const key = payload[this.upsert] ?? uuid();
    const value = this.#map.get(key) ?? {};
    this.#map.set(key, { ...value, payload });
    return this;
  }

  @after(emitter)
  reset() {
    this.#map.clear();
    return this;
  }
}

export default Dataset;
