/**
 * @const {symbol} textContent
 *
 * @description
 * Um Symbol único usado como a chave para a propriedade que armazena o
 * conteúdo HTML final a ser renderizado pelo componente `x-render`.
 *
 * @description
 * A função `component` do `x-render` acessa o conteúdo a ser renderizado
 * através de `render[textContent]`. O uso de um Symbol em vez de uma string
 * (como "textContent") evita conflitos com a propriedade `textContent` nativa
 * dos HTMLElements, garantindo que o comportamento do componente seja
 * previsível e livre de efeitos colaterais.
 *
 * @see Render[textContent]
 * @see Render.component
 */
export const textContent = Symbol("textContent");
