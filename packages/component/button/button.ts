import { around } from "@middleware";
import { Disabled, Hidden, Width } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import on from "@nodusjs/std/event";
import { truthy } from "@nodusjs/std/spark";
import { size, stop } from "@spark";
import { component } from "./component";
import { emitter } from "./interface";
import { style } from "./style";
import { token } from "./token";

@define("x-button")
@paint(component, token, style)
class Button extends Echo(Disabled(Hidden(Width(HTMLElement)))) {
  #color;
  #internals;
  #onlyIcon;
  #size;
  #type;
  #value;
  #variant;

  get color() {
    return (this.#color ??= "brand");
  }

  @attributeChanged("color")
  @retouch
  set color(value) {
    this.#color = value;
  }

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  get onlyIcon() {
    return (this.#onlyIcon ??= false);
  }

  @attributeChanged("only-icon", truthy)
  @retouch
  set onlyIcon(value) {
    this.#onlyIcon = value;
  }

  get size() {
    return (this.#size ??= "md");
  }

  @attributeChanged("size")
  @retouch
  set size(value) {
    this.#size = value;
  }

  get type() {
    return (this.#type ??= "submit");
  }

  @attributeChanged("type")
  set type(value) {
    this.#type = value;
  }

  get value() {
    return this.#value;
  }

  @attributeChanged("value")
  set value(value) {
    this.#value = value;
  }

  get variant() {
    return (this.#variant ??= "solid");
  }

  @attributeChanged("variant")
  @retouch
  set variant(value) {
    this.#variant = value;
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  @on.click("*", stop)
  @around(emitter)
  click() {
    if (super.disabled) return this;

    const init = { bubbles: true, cancelable: true, detail: this.value };
    const event = new CustomEvent("click", init);
    this.dispatchEvent(event);

    return this;
  }

  [emitter]() {
    if (super.disabled) return this;

    ({
      reset: () => this.internals.form?.reset?.(),
      submit: () => this.internals.form?.requestSubmit?.(),
    })[this.type]?.();

    return this;
  }
}

export default Button;
