import { around } from "@middleware";
import { attributeChanged } from "@nodusjs/std/directive";
import { truthy } from "@nodusjs/std/spark";
import { disableable } from "./interface";

export const Disabled = (Super) => {
  class C extends Super {
    #disabled;

    get disabled() {
      return (this.#disabled ??= false);
    }

    @attributeChanged("disabled", truthy)
    @around(disableable)
    set disabled(value) {
      this.#disabled = value;
    }

    [disableable]() {
      this.disabled
        ? this.internals.states.add("disabled")
        : this.internals.states.delete("disabled");
      return this;
    }
  }

  return C;
};
