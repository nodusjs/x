/**
 * @const {symbol} connectArc
 * @description
 * Um Symbol global (`Symbol.for`) usado para referenciar o método `connectArc`
 * do mixin `Echo`. O `x-on` usa este Symbol para invocar programaticamente
 * o método no seu elemento pai, anexando assim o listener de evento.
 *
 * O uso de `Symbol.for` garante que o mesmo Symbol possa ser acessado
 * em diferentes partes da aplicação.
 *
 * @see On[setter]
 */
export const connectArc = Symbol.for("connectArc");

/**
 * @const {symbol} setter
 * @description
 * Um Symbol único usado como o nome de um método privado-like na classe `On`.
 *
 * @description
 * O método `[setter]()` é decorado com `@connected` e contém a lógica
 * principal do componente `x-on`: aguardar a definição do elemento pai
 * e, em seguida, chamar o método `connectArc` do pai.
 *
 * @see On[setter]
 */
export const setter = Symbol("setter");
