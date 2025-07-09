/**
 * @const {symbol} trigger
 *
 * @description
 * Um Symbol único usado como o nome de um método privado-like na classe `Macro`.
 *
 * @description
 * O método `[trigger]()` é decorado com `@connected` e sua responsabilidade
 * é verificar se a propriedade `autorun` do componente `x-macro` é verdadeira.
 * Se for, ele agenda a execução do método `run()` principal do componente.
 *
 * O uso de um Symbol para nomear este método previne colisões com nomes
 * de métodos ou propriedades padrão do HTML e cria um contrato interno claro
 * para a funcionalidade de "autorun" do componente.
 *
 * @see Macro[trigger]
 * @see Macro.autorun
 */
export const trigger = Symbol("trigger");
