import { attributeChanged, define } from '@nodusjs/std/directive'
import Echo from '@nodusjs/std/echo'
import { connectArc, disconnectArc } from './interface'

@define('x-on')
class On extends Echo(HTMLElement) {
  #value;

  @attributeChanged('value')
  set value(value) {
    (async () => {
      await customElements.whenDefined(this.parentElement?.localName);
      this.parentElement?.[disconnectArc]?.(this.#value);
      this.parentElement?.[connectArc]?.(this.#value = value);
    })();
  }
}

export default On
