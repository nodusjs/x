import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import Text, { component, style } from "@typography/text";
import { style as restyle } from "./style";

@define("x-heading")
@paint(component, style, restyle)
class Heading extends Text {
  #as;

  get as() {
    return (this.#as ??= "h1");
  }

  @attributeChanged("as")
  @repaint
  set as(value) {
    this.#as = value;
  }
}

export default Heading;
