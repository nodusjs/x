import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { interpolate } from "./interpolate";

@define("x-render")
class Render extends Echo(HTMLElement) {
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

  render(payload) {
    const html = []
      .concat(payload)
      .map((data) => interpolate(this.template, data))
      .join("");
    this.shadowRoot.innerHTML = html;
    return this;
  }
}

export default Render;
