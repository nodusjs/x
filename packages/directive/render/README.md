# Componente `x-render`

`x-render` é um componente declarativo que atua como a camada de "view" no ecossistema `@nodusjs/x`. Sua principal função é receber um conjunto de dados (um objeto ou um array de objetos) e renderizar um template HTML para cada item.

## Instalação e Uso

Para usar o `x-render` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-render>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Responsabilidade

A principal responsabilidade do `x-render` é separar os dados da sua apresentação. Ele permite que você defina um template HTML e, em seguida, o preencha dinamicamente com dados recebidos de outros componentes, como `<x-dataset>` ou `<x-fetch>`.

1.  **Define um Template:** Você especifica a estrutura HTML a ser repetida dentro de uma tag `<template>`.
2.  **Ouve Eventos:** Usa o `<x-on>` para ouvir um evento (como `users/change`) que carrega os dados a serem renderizados.
3.  **Renderiza os Dados:** Ao receber os dados, ele itera sobre eles, injeta os valores no template usando placeholders (como `{name}`), e renderiza o resultado final na tela.
4.  **Reage a Mudanças:** Ele se re-renderiza automaticamente sempre que um novo conjunto de dados é recebido, mantendo a UI sempre sincronizada.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `layout` | `'list'`, `'grid'` | `'list'` | Define como os itens renderizados serão organizados: como uma lista vertical ou uma grade responsiva. |
| `gap` | `[token]` (ex: `'lg'`, `'2xl'`) | `'2xl'` | Controla o espaçamento entre os itens renderizados. |
| `hidden` | (booleano) | `false` | Esconde o componente da tela. |

## Como Definir o Template

Para definir o que o `<x-render>` deve exibir, coloque uma tag `<template>` diretamente dentro dele. Dentro do template, use placeholders com chaves `{}` para indicar onde os dados de cada item devem ser inseridos.

```html
<x-render>
  <template>
    <div class="card">
      <h3>{name}</h3>
      <p>Email: {email}</p>
    </div>
  </template>
</x-render>
```

## Exemplo de Uso Completo: Renderizando uma Lista de Usuários

O exemplo abaixo demonstra como o `<x-render>` ouve as mudanças de um `<x-dataset>` para exibir uma lista de usuários de forma reativa.

```html
<x-dataset name="users">
  </x-dataset>


<x-render layout="grid" gap="xl">

  <template>
    <x-card>
      <h4>{name}</h4>
      <p>Idade: {age}</p>
    </x-card>
  </template>

  <x-on value="users/change:method/render"></x-on>
</x-render>
```

### Fluxo de Dados:

1.  O `<x-dataset name="users">` é preenchido com um array de objetos de usuário (cada um com `name` e `age`).
2.  Por ter seus dados alterados, o dataset dispara um evento `users/change`. O `event.detail` contém o array completo de usuários.
3.  O `<x-on>` dentro do `<x-render>` captura este evento e aciona o método `render` do `<x-render>`, passando o array de usuários como argumento.
4.  O `<x-render>` itera sobre o array. Para cada objeto de usuário, ele pega o `<template>`, substitui `{name}` e `{age}` pelos valores do objeto e gera o HTML final.
5.  O resultado é renderizado na tela como uma grade de cards. Se um novo usuário for adicionado ao dataset, todo o processo se repete automaticamente.
