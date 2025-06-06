import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { interpolate } from "./interpolate";

@define("x-render")
class Render extends Echo(HTMLElement) {
  #template;

  get template() {
    const { innerHTML, children } = (this.#template ??=
      this.querySelector("template"));
    return (
      innerHTML ||
      Array.from(children)
        .map((c) => c.outerHTML)
        .join("")
    );
  }

  @attributeChanged("template")
  set template(value) {
    this.#template = document.querySelector(`#${value}`);
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
