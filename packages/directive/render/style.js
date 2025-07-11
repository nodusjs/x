import { css } from "@nodusjs/std/dom";

/**
 * @function style
 *
 * @param {object} render - A instância do componente `x-render`. Suas
 * propriedades, como `layout` e `gap`, são usadas para aplicar os estilos corretos.
 * @returns {CSSStyleSheet} A folha de estilo final para o contêiner de renderização.
 *
 * @description
 * Gera a folha de estilo (`CSSStyleSheet`) dinâmica para o componente `x-render`.
 *
 * @description
 * Esta função define os estilos de layout para o contêiner que envolve os
 * itens renderizados. Ela suporta dois modos de layout principais, controlados
 * pelo atributo `layout` do componente: "list" (padrão) e "grid".
 *
 * - **Modo Lista (`list`)**: Organiza os itens verticalmente com um
 * espaçamento (`gap`) customizável.
 * - **Modo Grade (`grid`)**: Cria uma grade responsiva que ajusta o número
 * de colunas com base na largura do próprio contêiner, utilizando
 * Container Queries (`@container`).
 */
export const style = (render) =>
  css`
    :host,
    :host([layout="list"]) {
      box-sizing: border-box;
      container-type: inline-size;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-${render.gap});
      width: 100%;
    }

    :host([layout="grid"]) {
      display: grid;
      grid-template-columns: repeat(1, 1fr);

      @container (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @container (min-width: 720px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @container (min-width: 960px) {
        grid-template-columns: repeat(4, 1fr);
      }

      @container (min-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
      }

      @container (min-width: 1440px) {
        grid-template-columns: repeat(6, 1fr);
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
