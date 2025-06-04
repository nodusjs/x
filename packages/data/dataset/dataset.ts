import { define } from "@nodusjs/std/directive";

@define("x-dataset")
class Dataset extends Echo(HTMLElement) {}

export default Dataset;
