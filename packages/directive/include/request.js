/**
 * @const {Map<string, Promise<string>>} memoize
 *
 * @private
 * Um Map que atua como um cache em memória para armazenar as promessas
 * das requisições de conteúdo. A chave é a URL (`src`) e o valor é a
 * promessa que resolve para o conteúdo de texto do arquivo.
 */
const memoize = new Map();

/**
 * @function request
 *
 * @summary
 * Busca o conteúdo de texto de uma URL e armazena o resultado em cache
 * para evitar requisições duplicadas para a mesma URL.
 *
 * @description
 * Esta função implementa a técnica de "memoization". Quando chamada com uma
 * URL (`src`) pela primeira vez, ela inicia uma requisição `fetch`, armazena
 * a `Promise` resultante no cache e a retorna.
 *
 * Em chamadas subsequentes para a mesma URL, em vez de fazer uma nova
 * requisição de rede, ela retorna a `Promise` já armazenada no cache,
 * melhorando significativamente a performance e evitando o recarregamento
 * do mesmo conteúdo repetidamente.
 *
 * @param {string} src - A URL do arquivo HTML a ser buscado.
 * @returns {Promise<string>} Uma promessa que resolve para o conteúdo de
 * texto do arquivo.
 */
export const request = (src) => {
  if (!memoize.has(src)) {
    memoize.set(
      src,
      fetch(src).then((response) => response.text()),
    );
  }
  return memoize.get(src);
};
