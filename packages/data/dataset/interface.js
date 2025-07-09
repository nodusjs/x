/**
 * @const {symbol} dispatch
 *
 * @description
 * Um Symbol único usado como um identificador para o middleware 'around'
 * dentro do componente `x-dataset`.
 *
 * Ele atua como a "chave" que conecta os métodos públicos que modificam
 * o estado do dataset (como `push`, `delete`, `reset`) com o método
 * privado `[dispatch]()`.
 *
 * A principal responsabilidade do `[dispatch]()` é disparar um evento
 * `change` com o estado atualizado do dataset, notificando todos os
 * componentes que estão ouvindo sobre a mudança. O uso de um Symbol
 * previne colisões de nomes e cria um contrato interno claro para o
 * middleware.
 *
 * @see Dataset.push
 * @see Dataset.delete
 * @see Dataset.reset
 * @see Dataset[dispatch]
 */
export const dispatch = Symbol("dispatch");
