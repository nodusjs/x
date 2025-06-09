import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";
import { token } from "./token";

@define("x-icon")
@paint(component, token, style)
class Icon extends Echo(HTMLElement) {
  #size;
  #use;

  get size() {
    return (this.#size ??= "md");
  }

  @attributeChanged("size")
  @retouch
  set size(value) {
    this.#size = value;
  }

  get use() {
    return (this.#use ??= "");
  }

  @attributeChanged("use")
  @repaint
  set use(value) {
    this.#use = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }
}

export default Icon;
