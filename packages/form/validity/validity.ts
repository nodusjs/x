import { reflactable, resettable, slotable, validable } from "@interface";
import {
  attributeChanged,
  connected,
  define,
  disconnected,
} from "@nodusjs/std/directive";
import { paint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";

@define("x-validity")
@paint(component, style)
class Validity extends Echo(HTMLElement) {
  #controller;
  #internals;
  #state;

  get controller() {
    return (this.#controller ??= new AbortController());
  }

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  get state() {
    return this.#state;
  }

  @attributeChanged("state")
  set state(value) {
    this.#state = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  [validable]() {
    this.parentElement.validity[this.state]
      ? this.internals.states.add("invalid")
      : this.internals.states.delete("invalid");
    return this;
  }

  @disconnected
  remove() {
    super.remove();
    this.controller.abort();
    return this;
  }

  @connected
  [slotable]() {
    this.setAttribute("slot", "validity");
    return this;
  }

  @connected
  async [reflactable]() {
    await customElements.whenDefined(this.parentElement?.localName);

    for (const event of ["change", "invalid"]) {
      this.parentElement.addEventListener(event, this[validable].bind(this), {
        signal: this.controller.signal,
      });
    }

    this.parentElement.addEventListener("reset", this[resettable].bind(this), {
      signal: this.controller.signal,
    });

    return this;
  }

  [resettable]() {
    this.internals.states.delete("invalid");
    return this;
  }
}

export default Validity;
