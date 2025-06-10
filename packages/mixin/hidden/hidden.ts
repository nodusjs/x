import { around } from "@middleware";
import { attributeChanged } from "@nodusjs/std/directive";
import { truthy } from "@nodusjs/std/spark";
import { hideable } from "./interface";

export const Hidden = (Super) => {
  class C extends Super {
    #hidden;

    get hidden() {
      return (this.#hidden ??= false);
    }

    @attributeChanged("hidden", truthy)
    @around(hideable)
    set hidden(value) {
      this.#hidden = value;
    }

    [hideable]() {
      this.hidden
        ? super.internals.states.add("hidden")
        : super.internals.states.delete("hidden");
      return this;
    }
  }

  return C;
};
