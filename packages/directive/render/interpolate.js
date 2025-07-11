/**
 * @function interpolate
 *
 * @param {string} text - A string de template HTML a ser processada.
 * @param {object} data - O objeto de dados contendo os valores para substituir os placeholders.
 * @returns {string} A string de template com os placeholders substituídos pelos dados.
 *
 * @summary
 * Substitui placeholders em uma string de template pelos valores
 * correspondentes de um objeto de dados.
 *
 * @description
 * Esta função recebe uma string de template que contém placeholders no formato
 * `{nomeDaPropriedade}` e um objeto de dados. Ela utiliza uma expressão
 * regular para encontrar todos os placeholders e, para cada um, cria e executa
 * dinamicamente uma pequena função (`new Function`) para acessar o valor
 * correspondente no objeto de dados.
 *
 * Se um placeholder estiver vazio (`{}`), a função retorna o próprio objeto de
 * dados, permitindo a renderização de valores primitivos.
 *
 * @example
 * const template = "<p>Olá, {user.name}!</p>";
 * const data = { user: { name: "Nodus" } };
 * const result = interpolate(template, data);
 * // result será "<p>Olá, Nodus!</p>"
 */
export const interpolate = (text, data) =>
  text.replace(/\{(.*?)\}/g, (_, namespace) => {
    if (namespace === "") return data;
    return new Function("data", `return data.${namespace}`)(data);
  });
