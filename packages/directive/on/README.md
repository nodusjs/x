# Componente `x-on`

`x-on` é um componente "headless" (sem interface visual) que anexa declarativamente um listener de dataflow (`Echo`) a um componente pai.

## Instalação e Uso

Para usar o `x-on` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-on>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Responsabilidade

A principal responsabilidade do `x-on` é permitir que qualquer componente (mesmo um que não tenha sido construído com o mixin `Echo`) possa ouvir e reagir a eventos do barramento de dataflow do Nodus.

Ele funciona como uma "ponte":

1.  Você o coloca como filho do elemento que deve reagir ao evento.
2.  Você define a "regra de escuta" no atributo `value` do `<x-on>`.
3.  Quando o `<x-on>` é conectado ao DOM, ele "injeta" a capacidade de escuta em seu pai, anexando o listener de evento a ele.

Isso é especialmente útil para manter a lógica de dataflow organizada e contida dentro do próprio template, em vez de espalhada em múltiplos atributos `on` nos componentes principais.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `value` | (string) | `""` | A string de dataflow do Echo (ex: `"users/change:method/render"`). |

## Exemplo de Uso

O exemplo abaixo (do CRUD de usuários) mostra múltiplos `<x-on>` sendo usados para conectar diferentes eventos a diferentes ações em um mesmo componente.

```html
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <x-on value="edit/click:attribute/value"></x-on>
  </x-find>
  <x-on value="user/submit:method/push"></x-on>
  <x-on value="update/submit:method/push"></x-on>
  <x-on value="delete/click:method/delete"></x-on>
</x-dataset>
```

Neste exemplo, em vez de colocar um longo atributo `on` no `<x-dataset>` com todas as regras separadas por vírgula, usamos múltiplos componentes `<x-on>` filhos. Isso torna o template mais legível e fácil de manter, pois cada `<x-on>` representa uma única responsabilidade de escuta.

## Descrição Técnica

Quando o `<x-on>` é conectado ao DOM, ele aguarda seu elemento pai ser definido e então invoca programaticamente o método `connectArc` do pai (disponibilizado pelo mixin `Echo`), passando a string de dataflow do seu atributo `value`. Isso efetivamente anexa o listener de evento ao componente pai como se ele tivesse sido declarado em um atributo `on` diretamente nele.
