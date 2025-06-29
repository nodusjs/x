import { connected, define } from "@nodusjs/std/directive";
import { paint } from "@nodusjs/std/dom";
import { component } from "./component";
import { slottable } from "./interface";
import { style } from "./style";

@define("x-action")
@paint(component, style)
class Action extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  @connected
  [slottable]() {
    this.setAttribute("slot", "action");
    return this;
  }
}

export default Action;
