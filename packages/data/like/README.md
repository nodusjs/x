# Componente `x-like`

`x-like` é um componente "headless" (sem interface visual) que atua como um motor de busca para filtrar itens dentro de um componente `<x-dataset>` pai.

## Instalação e Uso

Para usar o `x-like` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-like>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Relação com `x-dataset`

O `x-like` foi projetado para ser um filho direto de um `<x-dataset>`. Sua principal responsabilidade é:

1.  **Ouvir um evento:** Geralmente um evento `input-change` de um campo de busca que carrega o termo a ser pesquisado.
2.  **Receber o termo de busca:** Através do seu atributo `value`, ele recebe a string para a filtragem.
3.  **Filtrar no Pai:** Ele executa uma filtragem (case-insensitive) no array de dados do `<x-dataset>` pai, procurando por itens cuja propriedade (`key`) contenha o termo de busca.
4.  **Disparar o Resultado:** Após a filtragem, ele dispara um novo evento, `like`, contendo um array com todos os itens encontrados no `event.detail`.

Isso permite que um componente `<x-render>` ouça o evento `like` e exiba apenas os resultados da busca em tempo real.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `key` | (string) | `undefined` | O nome da propriedade dos objetos no dataset que será usada para a busca (ex: `'name'`, `'title'`). |
| `value`| (string) | `""` | O termo de busca. Alterar este atributo aciona a operação de filtragem. |

## Eventos Disparados

  - **`like`**: Disparado após a conclusão de uma filtragem. O `event.detail` contém um array com os objetos que correspondem ao critério de busca.

## Exemplo de Uso Completo

O exemplo abaixo demonstra como o `<x-like>` pode ser usado para criar uma funcionalidade de busca em tempo real para uma lista de usuários.

```html
<x-input id="search-input" name="search" placeholder="Buscar por nome..."></x-input>
<hr />


<x-render>
  <template>
    <p>{name}</p>
  </template>
  <x-on value="users/change:method/render"></x-on>
  <x-on value="users/like:method/render"></x-on>
</x-render>


<x-dataset name="users">
  <x-like key="name">
    <x-on value="search-input/input-change:attribute/value|prop=detail"></x-on>
  </x-like>
</x-dataset>
```

### Fluxo de Dados da Busca:

1.  O `<x-dataset>` é preenchido com uma lista inicial de usuários. O `<x-render>` exibe a lista completa.
2.  O usuário digita "Al" no campo de busca `<x-input>`. O campo dispara um evento `search-term-changed` com `detail: "Al"`.
3.  O `<x-on>` dentro do `<x-like>` ouve este evento, extrai o `detail` e define o atributo `value` do `<x-like>` para `"Al"`.
4.  A alteração no `value` do `<x-like>` aciona sua lógica interna. Ele filtra a lista de usuários no seu pai (`<x-dataset>`), retornando todos os usuários cujo `name` contenha "Al" (ex: "Alice", "Alex").
5.  O `<x-like>` dispara um evento `users/like` com este array filtrado no `detail`.
6.  O `<x-render>` ouve o evento `users/like` e se re-renderiza, mostrando apenas os nomes "Alice" e "Alex".
