import { resettable, submittable } from "@interface";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import on from "@nodusjs/std/event";
import { formData, prevent, stop } from "@spark";
import { component } from "./component";
import { style } from "./style";

@define("x-form")
@paint(component, style)
class Form extends Echo(HTMLElement) {
  #template;

  get template() {
    return (this.#template ??= this.querySelector("template").innerHTML);
  }

  @attributeChanged("template")
  set template(value) {
    this.#template = document.querySelector(`#${value}`).innerHTML;
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
  [resettable]() {
    const init = { bubbles: true, cancelable: true };
    const event = new CustomEvent("reset", init);
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
  [submittable](data) {
    const init = { bubbles: true, cancelable: true, detail: data };
    const event = new CustomEvent("submit", init);
    this.dispatchEvent(event);
    return this;
  }
}

export default Form;
