import { around } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { match } from "./interface";
import { resize } from "./resize";

@define("x-responsive")
class Resposive extends Headless(HTMLElement) {
  #media;

  get media() {
    return (this.#media ??= "");
  }

  @attributeChanged("media")
  @around(match)
  set media(value) {
    this.#media = value;
  }

  @resize
  [match]() {
    window.matchMedia(this.media).matches &&
      Array.from(this.attributes)
        .filter(({ name }) => !/^(media|style)$/.test(name))
        .forEach(({ name, value }) =>
          this.parentElement.setAttribute(name, value),
        );
    return this;
  }
}

export default Resposive;
