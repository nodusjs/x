/**
 * @decorator resize
 *
 * @param {object} target - O protótipo da classe do componente.
 * @param {string|symbol} propertyKey - O nome do método a ser invocado no resize.
 *
 * @summary
 * Um decorator de método que aciona o método decorado sempre que a
 * janela do navegador é redimensionada.
 *
 * @description
 * O `@resize` anexa um event listener ao evento `resize` da `window`.
 * Ele gerencia automaticamente o ciclo de vida do listener: o evento é
 * adicionado quando o componente é conectado ao DOM (`connectedCallback`)
 * e é removido quando o componente é desconectado (`disconnectedCallback`),
 * utilizando um `AbortController` para prevenir vazamentos de memória.
 *
 * É a ferramenta principal usada pelo componente `x-responsive` para
 * reavaliar as media queries em resposta a mudanças no tamanho da tela.
 *
 * @example
 * class MyComponent extends HTMLElement {
 *   @resize
 *   onWindowResize() {
 *     console.log('A janela foi redimensionada!');
 *   }
 * }
 */
export const resize = (target, propertyKey) => {
  const controller = new AbortController();

  target.connectedCallback = new Proxy(target.connectedCallback || (() => {}), {
    apply(original, context, args) {
      original.apply(context, args);
      window.addEventListener("resize", () => context[propertyKey](), {
        signal: controller.signal,
      });
    },
  });

  target.disconnectedCallback = new Proxy(
    target.disconnectedCallback || (() => {}),
    {
      apply(original, context, args) {
        original.apply(context, args);
        controller.abort();
      },
    },
  );
};
