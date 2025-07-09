/**
 * @const {symbol} render
 * @description
 * Um Symbol único usado como o nome de um método privado-like na classe `Include`.
 *
 * @description
 * O método `[render]()` é decorado com `@willPaint` e é responsável por
 * executar a lógica principal do componente: buscar o conteúdo do arquivo
 * HTML externo definido no atributo `src`. O uso de um Symbol para nomear
 * este método previne colisões com nomes de métodos ou propriedades padrão
 * do HTML.
 *
 * @see Include[render]
 */
export const render = Symbol("render");

/**
 * @const {symbol} textContent
 * @description
 * Um Symbol único usado como a chave para a propriedade que armazena o
 * conteúdo HTML buscado.
 *
 * @description
 * A função `component` do `x-include` acessa o conteúdo a ser renderizado
 * através de `include[textContent]`. O uso de um Symbol em vez de uma string
 * (como "textContent") evita conflitos com a propriedade `textContent` nativa
 * dos HTMLElements, garantindo que o comportamento do componente seja
.
 *
 * @see Include.component
 */
export const textContent = Symbol("textContent");
