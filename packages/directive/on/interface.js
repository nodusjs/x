/**
 * Símbolo que identifica o hook de conexão de “arcos” de comando no elemento pai.
 *
 * Usado por `<x-on>` para ligar uma nova instrução reativa ao evento alvo:
 * 1. É invocado com o identificador do arco e o valor de instrução.
 * 2. Deve ser implementado no componente pai para estabelecer a lógica desejada.
 *
 * @type {unique symbol}
 */
export const connectArc = Symbol.for("connectArc");

/**
 * Símbolo que identifica o hook de desconexão de “arcos” de comando no elemento pai.
 *
 * Usado por `<x-on>` para desligar qualquer instrução previamente conectada:
 * 1. É invocado com o identificador do arco antigo.
 * 2. Deve ser implementado no componente pai para limpar estados ou listeners.
 *
 * @type {unique symbol}
 */
export const disconnectArc = Symbol.for("disconnectArc");
