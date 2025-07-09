# Componente `x-macro`

`x-macro` é um componente "headless" (sem interface visual) que serve como uma ferramenta avançada para executar código JavaScript dinâmico dentro do ecossistema de dataflow do `@nodusjs/x`.

## Instalação e Uso

Para usar o `x-macro` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-macro>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Responsabilidade

A principal responsabilidade do `x-macro` é servir como um "escape hatch" para o sistema declarativo. Ele permite que você execute lógica JavaScript imperativa em resposta a eventos, para casos de uso que são muito complexos ou impossíveis de serem modelados apenas com a composição de `sparks`.

Ele funciona da seguinte maneira:

1.  **Ouve um Evento:** Usa o atributo `on` para ser acionado e receber um payload de um evento.
2.  **Executa um Script:** Executa o código JavaScript fornecido no atributo `execute`. Este código tem acesso ao payload do evento.
3.  **Dispara o Resultado:** Após a execução, dispara um evento `ok` com o valor de retorno do script, ou um evento `error` se ocorrer uma falha.

> **Aviso de Segurança:** Este componente utiliza `new Function()` para executar código a partir de uma string. Essa é uma funcionalidade poderosa, mas que pode apresentar riscos de segurança se o conteúdo do atributo `execute` vier de uma fonte não confiável. Use com responsabilidade.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `name` | (string) | `undefined` | O nome da macro, usado para identificar seus eventos (ex: `myMacro/ok`). |
| `execute`| (string) | `""` | A string de código JavaScript a ser executada. |
| `autorun`| (booleano) | `false` | Se presente, executa a macro uma vez, assim que o componente é conectado ao DOM. |

## Como Usar

### 1\. Contexto de Execução

O código dentro do atributo `execute` tem acesso a uma variável especial:

  - **`$0`**: Refere-se ao `event.detail` completo que acionou a macro.

### 2\. Exemplo de Uso: Transformação de Dados Complexa

**Cenário**: Um formulário de `x-form` dispara um evento `submit` com um objeto complexo no `detail`. Precisamos transformar esse objeto em uma única string formatada antes de enviá-lo para um `<x-dataset>`.

```html
<x-form name="user-profile">
  <template>
    <x-input name="firstName" value="Nodus"></x-input>
    <x-input name="lastName" value="JS"></x-input>
    <x-button type="submit">Gerar Sumário</x-button>
  </template>
</x-form>


<x-macro
  name="profile-summarizer"
  execute="`O nome completo é ${$0.firstName} ${$0.lastName}.`"
>
  <x-on value="user-profile/submit:method/run"></x-on>
</x-macro>


<x-dataset name="summaries">
  <x-on value="profile-summarizer/ok:method/push"></x-on>
</x-dataset>


<x-render>
  <template><p>Sumário: {value}</p></template>
  <x-on value="summaries/change:method/render"></x-on>
</x-render>
```

### Fluxo de Dados:

1.  O usuário clica em "Gerar Sumário". O `<x-form>` dispara um evento `user-profile/submit` com `detail: { firstName: 'Nodus', lastName: 'JS' }`.
2.  O `<x-macro>` ouve este evento e executa seu método `run` com o `detail` do evento.
3.  O código em `execute` é rodado, onde `$0` é `{ firstName: 'Nodus', lastName: 'JS' }`. Ele retorna a string `"O nome completo é Nodus JS."`.
4.  O `<x-macro>` dispara um evento `profile-summarizer/ok` com essa string no `detail`.
5.  O `<x-dataset>` ouve o evento `ok`, armazena a string e dispara seu próprio evento `summaries/change`.
6.  O `<x-render>` ouve o `change` e exibe o resultado final na tela.
