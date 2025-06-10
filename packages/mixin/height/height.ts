import { attributeChanged } from "@nodusjs/std/directive";
import { retouch } from "@nodusjs/std/dom";
import { size } from "@spark";

export const Height = (Super) => {
  class C extends Super {
    #height;

    get height() {
      return (this.#height ??= false);
    }

    @attributeChanged("height", size)
    @retouch
    set height(value) {
      this.#height = value;
    }
  }

  return C;
};
