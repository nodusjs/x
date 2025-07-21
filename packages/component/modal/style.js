import { css } from "@nodusjs/std/dom";

/**
 * @function style
 *
 * @param {object} modal - A instância do componente `x-modal`.
 * @returns {CSSStyleSheet} A folha de estilo final para o modal.
 *
 * @description
 * Gera a folha de estilo (`CSSStyleSheet`) dinâmica para o componente `x-modal`.
 *
 * Esta função define os estilos para o contêiner principal (`:host`),
 * para a camada de sobreposição (`overflow`), e para o elemento `<dialog>`
 * que contém o conteúdo do modal. A visibilidade do modal é controlada
 * dinamicamente pela propriedade `modal.opened`.
 */
export const style = (modal) =>
  css`
    :host {
      box-sizing: border-box;
      display: ${modal.opened ? "block" : "none"};
      height: 100vh;
      left: 0;
      position: fixed;
      top: 0;
      width: 100vw;

      overflow {
        align-items: center;
        background-color: var(--bg-overlay) 0.7;
        backdrop-filter: var(--backdrop-blur-md);
        display: flex;
        height: 100%;
        justify-content: center;
        width: 100%;

        dialog {
          background-color: transparent;
          border: none;
          padding: 0;
        }
      }
    }
  `;
