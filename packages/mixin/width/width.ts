import { attributeChanged } from "@nodusjs/std/directive";
import { retouch } from "@nodusjs/std/dom";
import { size } from "@spark";

export const Width = (Super) => {
  class C extends Super {
    #width;

    get width() {
      return (this.#width ??= false);
    }

    @attributeChanged("width", size)
    @retouch
    set width(value) {
      this.#width = value;
    }
  }

  return C;
};
