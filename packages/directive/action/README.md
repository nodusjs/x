# Componente `x-action`

`x-action` é um componente de layout auxiliar projetado para agrupar um ou mais elementos (como botões) e alocá-los automaticamente na seção de "ação" de um componente pai, como `<x-header>` ou `<x-footer>`.

## Responsabilidade

A principal responsabilidade do `x-action` é simplificar a composição de layouts complexos. Em vez de exigir que o desenvolvedor adicione manualmente o atributo `slot="action"` a cada grupo de botões, este componente faz isso automaticamente.

Ele funciona como um "wrapper" ou contêiner que, ao ser inserido na página, se auto-identifica como pertencente ao `slot` de ações, garantindo que seu conteúdo seja renderizado no local correto.

## Como Usar

Para usar o `x-action`, simplesmente envolva os elementos que você deseja posicionar na área de ação (geralmente à direita) de um componente contêiner.

### Exemplo de Uso com `<x-header>`

No exemplo abaixo, usamos o `<x-action>` para agrupar dois botões dentro de um cabeçalho. O componente se encarregará de posicioná-los corretamente.

```html
<x-header>
  <img src="/logo.svg" alt="Logo da Empresa">

  <x-action>
    <x-button variant="ghost">Preços</x-button>
    <x-button variant="solid">Entrar</x-button>
  </x-action>
</x-header>
```

### Exemplo de Uso com `<x-footer>`

O mesmo padrão se aplica a outros componentes de layout que possuem um `slot` nomeado `action`.

```html
<x-footer>
  <span>© 2024 NodusJS</span>

  <x-action>
    <x-button variant="outline">Cancelar</x-button>
    <x-button variant="solid">Salvar</x-button>
  </x-action>
</x-footer>
```

## Descrição Técnica

A "mágica" do `x-action` acontece quando ele é conectado ao DOM. Através do decorator `@connected` do `@nodusjs/std`, ele aciona um método interno que define seu próprio atributo `slot` como `"action"`.

Isso garante que, independentemente de onde o `<x-action>` seja colocado dentro de um componente pai compatível, ele e seus filhos serão sempre projetados para o `<slot name="action">` correto, simplificando o trabalho do desenvolvedor e garantindo a consistência do layout.
