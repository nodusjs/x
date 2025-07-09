/**
 * @function uuid
 *
 * @summary
 * Gera uma string de identificador pseudo-aleatória curta.
 *
 * @returns {string} Uma string de ID pseudo-aleatória.
 *
 * @description
 * Esta função utilitária cria um identificador único (Universally Unique Identifier)
 * de forma simplificada. Ela gera um número aleatório, o converte para uma
 * string na base 36 (que inclui números e letras), e extrai uma fatia
 * para criar um ID curto e prático.
 *
 * É usada internamente pela classe `Storage` para gerar chaves para itens
 * do dataset que não possuem uma chave de "upsert" definida.
 *
 * @see Storage.push
 */
export const uuid = () => Math.random().toString(36).slice(2);
