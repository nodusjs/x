import { Headless } from "@mixin";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { handle } from "./interface";
import { mismatch } from "./mismatch";
import { urlState } from "./urlState";

@define("x-route")
class Route extends Echo(Headless(HTMLElement)) {
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
    this.parentElement.setAttribute("src", this.src);
    return this;
  }
}

export default Route;
