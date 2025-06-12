import { connected, define } from "@nodusjs/std/directive";
import { paint } from "@nodusjs/std/dom";
import { component } from "./component";
import { slottable } from "./interface";
import { style } from "./style";

@define("x-label")
@paint(component, style)
class Label extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  @connected
  [slottable]() {
    this.setAttribute("slot", "label");
    return this;
  }
}

export default Label;
