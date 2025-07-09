# Componente `x-find`

`x-find` é um componente "headless" (sem interface visual) que atua como um gatilho para buscar um item específico dentro de um componente `<x-dataset>` pai.

## Instalação e Uso

Para usar o `x-find` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-find>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Relação com `x-dataset`

O `x-find` foi projetado para ser um filho direto de um `<x-dataset>`. Sua principal responsabilidade é:

1.  **Ouvir um evento:** Geralmente um clique de botão que carrega um ID ou outra chave única.
2.  **Receber a chave:** Através do seu atributo `value`, ele recebe a chave do item a ser procurado.
3.  **Buscar no Pai:** Ele executa uma busca no array de dados do `<x-dataset>` pai.
4.  **Disparar o Resultado:** Após encontrar o item, ele dispara um novo evento, `find`, contendo os dados completos do item encontrado no `event.detail`.

Isso permite que outros componentes, como um formulário de edição, ouçam o evento `find` e se preencham com os dados do item para atualização.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `key` | (string) | `undefined` | O nome da propriedade que será usada como chave na busca (ex: `'id'`). |
| `value`| `qualquer` | `undefined` | O valor da chave que será procurado no dataset. Alterar este atributo aciona a busca. |

## Eventos Disparados

  - **`find`**: Disparado após uma busca bem-sucedida. O `event.detail` contém o objeto do item encontrado.

## Exemplo de Uso Completo

O exemplo abaixo (do CRUD de usuários) mostra o `<x-find>` em ação. Ele é o responsável por conectar o clique no botão "edit" com a exibição do formulário de atualização.

```html
<x-render>
  <template>
    <x-stack>
      <x-text>{name}</x-text>
      <x-button name="edit" value="{id}">Editar</x-button>
    </x-stack>
  </template>
  <x-on value="users/change:method/render"></x-on>
</x-render>


<x-render>
  <template>
    <x-form name="update">
      <template>
        <x-input name="id" value="{id}" hidden></x-input>
        <x-input name="name" value="{name}"></x-input>
        <x-button>Salvar Alterações</x-button>
      </template>
    </x-form>
  </template>
  <x-on value="users/find:method/render"></x-on>  
</x-render>


<x-dataset name="users" upsert="id">
  <x-find key="id">
    <x-on value="edit/click:attribute/value"></x-on>
  </x-find>
</x-dataset>
```

### Fluxo de Dados da Edição:

1.  O usuário clica no botão "Editar" de um item da lista. O botão dispara um evento `edit/click` com, por exemplo, `detail: 123`.
2.  O `<x-on>` dentro do `<x-find>` ouve este evento e define o atributo `value` do `<x-find>` para `123`.
3.  A alteração no `value` do `<x-find>` aciona sua lógica interna. Ele busca no array do seu pai (`<x-dataset>`) pelo item onde a propriedade `id` é igual a `123`.
4.  Ao encontrar o item (ex: `{id: 123, name: 'Alice'}`), o `<x-find>` dispara um evento `users/find` com este objeto no `detail`.
5.  O `<x-render>` do formulário de atualização ouve o evento `users/find` e usa o `detail` para se renderizar, preenchendo os campos com os dados de "Alice".
