import { define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";

@paint("x-find")
class Find extends Echo(HTMLElement) {}

export default Find;
