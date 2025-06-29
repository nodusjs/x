import { interpolate } from "@directive/render/interpolate";
import { around } from "@middleware";
import { Hidden, Template, Width } from "@mixin";
import {
  attributeChanged,
  define,
  disconnected,
  formAssociated,
  formReset,
} from "@nodusjs/std/directive";
import { didPaint, paint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import on from "@nodusjs/std/event";
import { truthy } from "@nodusjs/std/spark";
import { prevent, value } from "@spark";
import { component } from "./component";
import Element from "./element";
import {
  change,
  disableable,
  dispatch,
  hydrate,
  reflectable,
  reportable,
  validatable,
} from "./interface";
import { invalid } from "./invalid";
import { style } from "./style";

@define("x-select")
@paint(component, style)
class Select extends Echo(Hidden(Template(Width(HTMLElement)))) {
  #controller;
  #element;
  #internals;

  get controller() {
    return (this.#controller ??= new AbortController());
  }

  get disabled() {
    return this.element.disabled;
  }

  @attributeChanged("disabled", truthy)
  @around(disableable)
  set disabled(value) {
    this.element.disabled = value;
  }

  get element() {
    return (this.#element ??= Element.from(this));
  }

  get form() {
    return this.internals.form;
  }

  get id() {
    return this.element.id || this.name;
  }

  @attributeChanged("id")
  set id(value) {
    this.element.id = value;
  }

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  get name() {
    return (this.element.name ??= "");
  }

  @attributeChanged("name")
  set name(value) {
    this.element.name = value;
  }

  get readonly() {
    return this.element.readonly;
  }

  @attributeChanged("readonly", truthy)
  set readonly(value) {
    this.element.readonly = value;
  }

  get required() {
    return this.element.required;
  }

  @attributeChanged("required", truthy)
  @around(validatable)
  @around(reflectable)
  set required(value) {
    this.element.required = value;
  }

  get validationMessage() {
    return this.internals.validationMessage;
  }

  get validity() {
    return this.internals.validity;
  }

  get value() {
    return this.element.value;
  }

  @attributeChanged("value")
  @around(validatable)
  @around(reflectable)
  set value(value) {
    this.element.value = value;
  }

  get willValidate() {
    return this.internals.willValidate;
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  @on.change("select", value)
  @around(dispatch)
  [change](val) {
    this.value = val;
    return this;
  }

  checkValidity() {
    return this.internals.checkValidity();
  }

  [disableable]() {
    this.disabled
      ? this.internals.states.add("disabled")
      : this.internals.states.delete("disabled");
    return this;
  }

  [dispatch]() {
    const init = { bubbles: true, cancelable: true, detail: this.value };
    const event = new CustomEvent("change", init);
    this.dispatchEvent(event);
    return this;
  }

  @didPaint
  [hydrate]() {
    this.element.append(...this.querySelectorAll("option"));
    return this;
  }

  @disconnected
  remove() {
    super.remove();
    this.controller.abort();
    return this;
  }

  @around("reset")
  render(payload) {
    requestAnimationFrame(() => {
      this.element.innerHTML = [{}]
        .concat(payload)
        .map((data) => interpolate(super.template, data))
        .join("");
    });
    return this;
  }

  reportValidity() {
    return this.internals.reportValidity();
  }

  @formReset
  @around(reflectable)
  reset() {
    this.element.value = "";
    this.removeAttribute("value");
    this.internals.states.delete("invalid");
    this.dispatchEvent(new Event("reset"));
    return this;
  }

  @invalid(prevent)
  [validatable]() {
    this.validity.valid
      ? this.internals.states.delete("invalid")
      : this.internals.states.add("invalid");
    return this;
  }

  @formAssociated
  [reportable](form) {
    if (this.disabled) return this;

    const event = "formdata";
    const listener = (event) => event.formData.set(this.name, this.value);
    const options = { signal: this.controller.signal };
    form?.addEventListener?.(event, listener, options);

    return this;
  }

  @didPaint
  [reflectable]() {
    const { validationMessage, validity } = this.element;
    this.internals.setValidity(validity, validationMessage);
    return this;
  }
}

export default Select;
