import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";

@define("x-redirect")
class Redirect extends Echo(Headless(HTMLElement)) {
  #href;

  get href() {
    return (this.#href ??= "#");
  }

  @attributeChanged("href")
  set href(value) {
    this.#href = value;
  }

  go() {
    history.pushState({}, "", this.href);
    return this;
  }
}

export default Redirect;
