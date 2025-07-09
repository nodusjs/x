/**
 * @const http
 *
 * @summary
 * Um invólucro (wrapper) dinâmico e fluente para a API `fetch` do navegador,
 * implementado com um Proxy para criar requisições HTTP de forma declarativa.
 *
 * @description
 * O objeto `http` utiliza um Proxy para interceptar chamadas de método
 * (como `http.get`, `http.post`, etc.). Ele gera dinamicamente uma interface
 * de construção de requisição (builder pattern) que permite encadear
 * configurações como `body`, `headers` e `signal`.
 *
 * A chamada final, como `.json()`, executa a requisição e retorna uma
 * promessa que resolve para um objeto padronizado `{ data, error }`,
 * simplificando o tratamento de sucesso e erro.
 *
 * @example
 * // Exemplo de uma requisição GET
 * http.get('https://api.example.com/users/1')
 *   .signal(myAbortController.signal)
 *   .json()
 *   .then(({ data, error }) => {
 *     if (error) console.error('Falhou!', error);
 *     else console.log('Usuário:', data);
 *   });
 *
 * // Exemplo de uma requisição POST
 * http.post('https://api.example.com/users')
 *   .body({ name: 'Nodus' })
 *   .headers({ 'Content-Type': 'application/json' })
 *   .json()
 *   .then(({ data, error }) => { ... });
 */
const http = new Proxy(
  {},
  {
    get(_, method) {
      /**
       * Inicia a construção de uma requisição HTTP.
       * @param {string} url - A URL do endpoint para a requisição.
       * @returns {object} Um objeto com métodos para construir a requisição.
       */
      return (url) => {
        const init = {
          method,
        };

        return {
          /**
           * Adiciona um corpo (body) à requisição, convertendo o objeto
           * para uma string JSON.
           * @param {object} target - O objeto a ser enviado no corpo.
           * @returns {this} A própria instância do builder para encadeamento.
           */
          body(target) {
            Object.assign(init, {
              body: JSON.stringify(target),
            });
            return this;
          },

          /**
           * Adiciona cabeçalhos (headers) à requisição.
           * @param {object} target - Um objeto com os cabeçalhos.
           * @returns {this} A própria instância do builder para encadeamento.
           */
          headers(target) {
            Object.assign(init, {
              headers: new Headers(target),
            });
            return this;
          },

          /**
           * Executa a requisição e tenta analisar a resposta como JSON.
           * Este é o método finalizador do builder.
           * @returns {Promise<{data: any, error: any}>} Uma promessa que resolve
           * para um objeto com a propriedade `data` preenchida em caso de sucesso,
           * ou a propriedade `error` preenchida em caso de falha.
           */
          json() {
            return fetch(url, init)
              .then(async (response) => {
                const json = await response.json();
                return response.ok
                  ? { data: json, error: null }
                  : { data: null, error: json };
              })
              .catch((error) => ({ data: null, error }));
          },

          /**
           * Associa um `AbortSignal` à requisição, permitindo que ela
           * seja cancelada.
           * @param {AbortSignal} target - O sinal de um `AbortController`.
           * @returns {this} A própria instância do builder para encadeamento.
           */
          signal(target) {
            Object.assign(init, {
              signal: target,
            });
            return this;
          },
        };
      };
    },
  },
);

export default http;
