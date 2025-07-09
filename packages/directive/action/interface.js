/**
 * @const {symbol} slottable
 *
 * @description
 * Um Symbol único usado como o nome de um método privado-like na classe `Action`.
 *
 * @description
 * O método `[slottable]()` é decorado com `@connected` e sua única
 * responsabilidade é auto-atribuir o atributo `slot="action"` ao
 * componente `x-action` quando ele é inserido no DOM.
 *
 * O uso de um Symbol para nomear este método evita qualquer colisão
 * com nomes de métodos ou propriedades padrão do HTML e cria um
 * contrato interno claro para a funcionalidade de "auto-alocação" do componente.
 *
 * @see Action[slottable]
 */
export const slottable = Symbol("slottable");
