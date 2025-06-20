import { Headless } from "@mixin";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { run } from "./interface";

@define("x-macro")
class Macro extends Echo(Headless(HTMLElement)) {
  #execute;

  get execute() {
    return (this.#execute ??= "");
  }

  @attributeChanged("execute")
  set execute(value) {
    this.#execute = value;
  }

  @connected
  [run]() {
    try {
      const X = { params: { id: 111 } };
      const detail = new Function("X", `return ${this.execute}`)(X);
      this.dispatchEvent(new CustomEvent("ok", { detail }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent("error", { detail: error.message }));
    }
    return this;
  }
}

export default Macro;
