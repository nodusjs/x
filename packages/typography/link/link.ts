import { Hidden } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import on from "@nodusjs/std/event";
import { prevent } from "@spark";
import { component } from "./component";
import { style } from "./style";

@define("x-link")
@paint(component, style)
class Link extends Echo(Hidden(HTMLElement)) {
  #href;
  #internals;
  #size;
  #wrap;

  get href() {
    return (this.#href ??= "/");
  }

  @attributeChanged("href")
  set href(value) {
    this.#href = value;
  }

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  get size() {
    return (this.#size ??= "md");
  }

  @attributeChanged("size")
  @retouch
  set size(value) {
    this.#size = value;
  }

  get wrap() {
    return (this.#wrap ??= "wrap");
  }

  @attributeChanged("wrap")
  @retouch
  set wrap(value) {
    this.#wrap = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  @on.click("*", prevent)
  click() {
    history.pushState({}, "", this.href);
    return this;
  }
}

export default Link;
