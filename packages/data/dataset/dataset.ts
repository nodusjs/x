import { around } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { dispatch } from "./interface";
import { Storage } from "./storage";

@define("x-dataset")
class Dataset extends Echo(Headless(HTMLElement)) {
  #storage = Storage.from(this);
  #upsert;

  get upsert() {
    return this.#upsert;
  }

  @attributeChanged("upsert")
  set upsert(value) {
    this.#upsert = value;
  }

  get value() {
    return this.#storage.values();
  }

  @around(dispatch)
  delete(key) {
    this.#storage.delete(key);
    return this;
  }

  [dispatch]() {
    const init = { bubbles: true, cancelable: true, detail: this.value };
    const event = new CustomEvent("change", init);
    this.dispatchEvent(event);
    return this;
  }

  @around(dispatch)
  push(data) {
    this.#storage.push(data);
    return this;
  }

  @around(dispatch)
  reset() {
    this.#storage.clear();
    return this;
  }
}

export default Dataset;
