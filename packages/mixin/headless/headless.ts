import { connected } from "@nodusjs/std/directive";
import { hideable } from "./interface";

export const Headless = (Super) => {
  class C extends Super {
    @connected
    [hideable]() {
      this.style.setProperty("display", "none");
      return this;
    }
  }

  return C;
};
