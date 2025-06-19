import { Headless } from "@mixin";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import { handle, render } from "./interface";
import { mismatch } from "./mismatch";
import { request } from "./request";
import { urlState } from "./urlState";

@define("x-route")
class Route extends Headless(HTMLElement) {
  #path;
  #src;

  get path() {
    return (this.#path ??= "");
  }

  @attributeChanged("path")
  set path(value) {
    this.#path = value;
  }

  get src() {
    return (this.#src ??= "");
  }

  @attributeChanged("src")
  set src(value) {
    this.#src = value;
  }

  @connected
  @urlState
  async [handle]() {
    if (mismatch(this.path)) return this;
    await customElements.whenDefined(this.parentElement?.localName);
    this.parentElement[render]?.(await request(this.src));
    return this;
  }
}

export default Route;
