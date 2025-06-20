import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";

@define("x-title")
class Route extends Echo(Headless(HTMLElement)) {
  @attributeChanged("value")
  set value(value) {
    document.title = value;
  }
}

export default Route;
