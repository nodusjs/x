import { define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";

@define("x-icon")
class Icon extends Echo(HTMLElement) {}

export default Icon;
