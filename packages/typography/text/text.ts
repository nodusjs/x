import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import { component } from "./component";
import { style } from "./style";
import { truthy } from '@nodusjs/std/spark'

@define("x-text")
@paint(component, style)
class Text extends HTMLElement {
	#align;
	#color;
	#onBrand;
	#size;
	#wrap;
	#weight;

	get align() {
		return (this.#align ??= "left");
	}

	@attributeChanged('align')
	@repaint
	set align(value) {
	  this.#align = value
	}

	get color() {
		return (this.#color ??= "primary");
	}

	@attributeChanged('color')
	@repaint
	set color(value) {
	  this.#color = value
	}

  get onBrand() {
		return (this.#onBrand ??= false);
	}

	@attributeChanged('on-brand', truthy)
	@repaint
	set onBrand(value) {
	  this.#onBrand = value
	}

  get size() {
		return (this.#size ??= "md");
	}

	@attributeChanged('size')
	@repaint
	set size(value) {
	  this.#size = value
	}

  get wrap() {
		return (this.#wrap ??= "wrap");
	}

	@attributeChanged('wrap')
	@repaint
	set wrap(value) {
	  this.#wrap = value
	}

  get weight() {
		return (this.#weight ??= "medium");
	}

	@attributeChanged('weight')
	@repaint
	set weight(value) {
	  this.#weight = value
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
}

export default Text;
