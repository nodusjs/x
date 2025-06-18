import { define } from "@nodusjs/std/directive";

@define("x-view")
class View extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }
}

export default View;
