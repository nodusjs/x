import { Template } from "@mixin";
import { define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { interpolate } from "./interpolate";

@define("x-render")
class Render extends Echo(Template(HTMLElement)) {
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  render(payload) {
    requestAnimationFrame(() => {
      const html = []
        .concat(payload)
        .map((data) => interpolate(super.template, data))
        .join("");
      this.shadowRoot.innerHTML = html;
    });
    return this;
  }
}

export default Render;
