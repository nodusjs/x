/**
 * Marca um componente que precisa reportar seu valor ao formulário
 * por meio de uma entrada em FormData (ouvinte de `formdata`).
 *
 * Em um componente form-associated, isso significa que ele
 * implementa a lógica de adicionar seu valor a FormData
 * quando o formulário é submetido.
 */
export const reportable = Symbol("reportable");
