# Componente `x-dataset`

`x-dataset` é um componente "headless" (sem interface visual) que atua como um **gerenciador de estado** ou um banco de dados no lado do cliente. Ele é a peça central para a criação de aplicações reativas e orientadas a dados no ecossistema `@nodusjs/x`.

## Instalação e Uso

Para usar o `x-dataset` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-dataset>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Responsabilidade

A principal função do `x-dataset` é centralizar e gerenciar uma coleção de dados (como uma lista de usuários, produtos, etc.). Ele funciona da seguinte maneira:

1.  **Armazena Dados:** Mantém uma lista de objetos em memória.
2.  **Ouve Eventos:** Usa o atributo `on` para receber dados de outros componentes (como um `<x-form>`) e modificar sua coleção interna através de métodos como `push`, `delete` e `reset`.
3.  **Dispara Notificações:** Sempre que seus dados são alterados, ele dispara um evento `change` no barramento de eventos, com a coleção de dados completa em seu `detail`.
4.  **Habilita Reatividade:** Outros componentes (como `<x-render>` ou `x-button`) podem ouvir o evento `change` do `x-dataset` para se atualizarem, criando um fluxo de dados reativo e declarativo.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `name` | (string) | `undefined` | O nome do dataset, usado para identificar seus eventos (ex: `users/change`). |
| `upsert` | (string) | `undefined` | O nome de uma propriedade (ex: `'id'`) usada como chave única para atualizar itens existentes em vez de adicionar novos. |
| `value` | (somente leitura) | `[]` | Um getter que retorna um array com todos os dados atualmente armazenados. |

## Métodos (API Pública)

Você pode interagir com o `x-dataset` através de seus métodos, geralmente acionados por eventos de outros componentes via `Echo`.

  - **`push(data)`**: Adiciona um novo objeto ou um array de objetos ao dataset. Se a chave `upsert` estiver definida, ele atualizará um item existente se a chave corresponder.
  - **`delete(key)`**: Remove um item do dataset com base no valor da sua chave (`upsert`).
  - **`reset()`**: Limpa todos os dados do dataset, deixando-o vazio.
  - **`find(key)`**: Encontra e retorna um item específico pela sua chave.

## Exemplo de Uso Completo: CRUD de Usuários

O exemplo abaixo demonstra como o `<x-dataset>` pode orquestrar uma interface de CRUD (Create, Read, Update, Delete) completa, sem a necessidade de JavaScript para gerenciar o estado.

```html
<x-form name="user">
  <template>
    <x-input name="name" required><x-label>User</x-label></x-input>
    <x-input name="age" type="number" required><x-label>Age</x-label></x-input>
    <x-button>Submit</x-button>
  </template>
  <x-on value="user/submit:method/reset"></x-on>
</x-form>


<x-render>
  <template>
    <x-stack width="fill">
      <x-stack width="fill">
        <x-text>{name} - {age}</x-text>
      </x-stack>
      <x-button name="edit" value="{id}" variant="outlined">
        <x-icon use="edit"></x-icon>
      </x-button>
      <x-button name="delete" value="{id}" color="error" variant="outlined">
        <x-icon use="delete"></x-icon>
      </x-button>
    </x-stack>
  </template>
  <x-on value="users/change:method/render"></x-on>
</x-render>


<x-render>
  <template>
    <x-form name="update">
      <template>
        <x-input name="id" value="{id}" hidden></x-input>
        <x-input name="name" value="{name}" required><x-label>User</x-label></x-input>
        <x-input name="age" value="{age}" type="number" required><x-label>Age</x-label></x-input>
        <x-button>Save</x-button>
      </template>
      <x-on value="update/submit:method/reset"></x-on>
      <x-on value="update/submit:attribute/hidden"></x-on>
    </x-form>
  </template>
  <x-on value="users/find:method/render"></x-on>  
</x-render>


<x-dataset name="users" upsert="id">
  <x-find key="id">
    <x-on value="edit/click:attribute/value"></x-on>
  </x-find>
  <x-on value="user/submit:method/push"></x-on>
  <x-on value="update/submit:method/push"></x-on>
  <x-on value="delete/click:method/delete"></x-on>
</x-dataset>
```
