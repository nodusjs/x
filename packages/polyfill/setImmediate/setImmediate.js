/**
 * Polyfill para `setImmediate`, utilizado para agendar a execução de uma função
 * imediatamente após o ciclo atual da stack de chamadas, antes do próximo tick do event loop.
 *
 * Caso o ambiente não possua suporte nativo a `setImmediate`, este polyfill
 * define `globalThis.setImmediate` utilizando `setTimeout(fn, 0)` como alternativa.
 *
 * Este comportamento é útil para executar tarefas de baixa prioridade de forma assíncrona,
 * mas com execução mais imediata do que Promises ou `requestAnimationFrame`.
 *
 * @example
 * setImmediate(() => {
 *   console.log("Executado após o ciclo atual");
 * });
 */
if (typeof globalThis.setImmediate !== "function") {
  Reflect.defineProperty(globalThis, "setImmediate", {
    value(fn) {
      return setTimeout(fn, 0);
    },
  });
}
