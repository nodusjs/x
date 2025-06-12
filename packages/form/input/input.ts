import { around } from "@middleware";
import { Hidden } from "@mixin";
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
  disableable,
  dispatch,
  input,
  reflectable,
  reportable,
  validatable,
} from "./interface";
import { invalid } from "./invalid";
import { style } from "./style";

@define("x-input")
@paint(component, style)
class Input extends Echo(Hidden(HTMLElement)) {
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
    return this.element.id;
  }

  @attributeChanged("id")
  set id(value) {
    this.element.id = value;
  }

  get elementMode() {
    return this.element.elementMode;
  }

  @attributeChanged("elementmode")
  set elementMode(value) {
    this.element.elementMode = value;
  }

  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  get max() {
    return (this.element.max ??= "");
  }

  @attributeChanged("max")
  @around(validatable)
  @around(reflectable)
  set max(value) {
    this.element.max = value;
  }

  get maxLength() {
    return (this.element.maxlength ??= "");
  }

  @attributeChanged("maxlength")
  @around(validatable)
  @around(reflectable)
  set maxLength(value) {
    this.element.maxlength = value;
  }

  get min() {
    return (this.element.min ??= "");
  }

  @attributeChanged("min")
  @around(validatable)
  @around(reflectable)
  set min(value) {
    this.element.min = value;
  }

  get minLength() {
    return (this.element.minlength ??= "");
  }

  @attributeChanged("minlength")
  @around(validatable)
  @around(reflectable)
  set minLength(value) {
    this.element.minlength = value;
  }

  get name() {
    return (this.element.name ??= "");
  }

  @attributeChanged("name")
  set name(value) {
    this.element.name = value;
  }

  get pattern() {
    return this.element.pattern;
  }

  @attributeChanged("pattern")
  @around(validatable)
  @around(reflectable)
  set pattern(value) {
    this.element.pattern = value;
  }

  get placeholder() {
    return this.element.placeholder;
  }

  @attributeChanged("placeholder")
  set placeholder(value) {
    this.element.placeholder = value;
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

  get step() {
    return this.element.step;
  }

  @attributeChanged("step")
  @around(validatable)
  @around(reflectable)
  set step(value) {
    this.element.step = value;
  }

  get type() {
    return this.element.type;
  }

  @attributeChanged("type")
  @around(validatable)
  @around(reflectable)
  set type(value) {
    this.element.type = value;
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

  @on.input("input", value)
  @around(dispatch)
  [input](val) {
    this.value = val;
    return this;
  }

  @disconnected
  remove() {
    super.remove();
    this.controller.abort();
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

export default Input;
