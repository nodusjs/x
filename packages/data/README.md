# Pacote `data`

O pacote `data` é o pilar de gerenciamento de dados e estado do Design System `@nodusjs/x`. Ele contém uma coleção de componentes "headless" (sem interface visual) que trabalham em conjunto para buscar, armazenar, filtrar e gerenciar os dados da aplicação de forma reativa e declarativa.

## Responsabilidade

A principal responsabilidade deste pacote é fornecer os blocos de construção para criar uma arquitetura de dataflow robusta. Diferente do pacote `component` que oferece elementos de UI visíveis, o pacote `data` oferece "motores" lógicos que operam em segundo plano.

Cada componente neste pacote encapsula uma lógica de dados específica:

  - **`<x-dataset>`**: Atua como um "store" ou banco de dados no lado do cliente.
  - **`<x-fetch>`**: Gerencia a comunicação com APIs externas.
  - **`<x-find>`**: Busca um item específico em um `x-dataset`.
  - **`<x-like>`**: Filtra uma lista de itens em um `x-dataset`.

Juntos, eles permitem que você construa aplicações complexas onde o estado e a busca de dados são definidos diretamente no HTML, com os componentes se comunicando através do barramento de eventos do `@nodusjs/std`.

## Componentes Disponíveis

O pacote `data` é composto pelos seguintes componentes:

  - **`dataset`**: O componente central de gerenciamento de estado. Ele armazena coleções de dados e dispara eventos quando esses dados são alterados.
  - **`fetch`**: Um wrapper declarativo para a API `fetch`, usado para buscar ou enviar dados para um servidor.
  - **`find`**: Um auxiliar para o `dataset` que encontra um item específico em uma coleção com base em uma chave.
  - **`like`**: Um auxiliar para o `dataset` que filtra os itens de uma coleção com base em um termo de busca.

## Como Usar

A forma de uso é simplificada pela arquitetura do `@nodusjs/x`. Para ter acesso a todos os componentes de dados em seu projeto, basta a importação principal da biblioteca, que já se encarrega de registrar todos os elementos.

```javascript
// Importa o pacote principal, que por sua vez importa e registra
// todos os componentes do pacote 'data'.
import "@nodusjs/x";
```

Essa abordagem permite que você comece a usar componentes como `<x-dataset>` e `<x-fetch>` diretamente no seu HTML para construir a lógica de dados da sua aplicação.
