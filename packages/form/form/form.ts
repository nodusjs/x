import { attributeChanged, define } from "@nodusjs/std";
import { paint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import on from "@nodusjs/std/event";
import component from "./component";
import style from "./style";

@define("x-form")
@paint(component, style)
class Form extends Echo(HTMLElement) {
  #template;

  get template() {
    return this.#template
      ? document.querySelector(`#${this.#template}`)
      : this.shadowRoot.querySelector("template");
  }

  @attributeChanged("template")
  set template(value) {
    this.#template = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  reset() {
    const init = { bubbles: true, cancelable: true };
    const event = new Event("reset", init);
    this.shadowRoot.querySelector("form").dispatchEvent(event);
    return this;
  }

  @on.reset("form")
  [reseted]() {
    const init = { bubbles: true, cancelable: true };
    const event = new CustomEvent("reseted", init);
    this.dispatchEvent(event);
    return this;
  }

  submit() {
    const init = { bubbles: true, cancelable: true };
    const event = new Event("submit", init);
    this.shadowRoot.querySelector("form").dispatchEvent(event);
    return this;
  }

  @on.submit("form", prevent, formData)
  [submitted](data) {
    const init = { bubbles: true, cancelable: true, detail: data };
    const event = new CustomEvent("submitted", init);
    this.dispatchEvent(event);
    return this;
  }
}

export default Form;
