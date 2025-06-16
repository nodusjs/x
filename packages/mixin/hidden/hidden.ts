import { around, before } from "@middleware";
import { attributeChanged } from "@nodusjs/std/directive";
import { truthy } from "@nodusjs/std/spark";
import { cleanup, hideable } from "./interface";

export const Hidden = (Super) => {
  class C extends Super {
    #hidden;

    get hidden() {
      return (this.#hidden ??= false);
    }

    @attributeChanged("hidden", truthy)
    @around(hideable)
    @before(cleanup)
    set hidden(value) {
      this.#hidden = value;
    }

    [cleanup](value) {
      value === false && this.removeAttribute("hidden");
      return value;
    }

    [hideable]() {
      this.hidden
        ? this.internals.states.add("hidden")
        : this.internals.states.delete("hidden");
      return this;
    }
  }

  return C;
};
