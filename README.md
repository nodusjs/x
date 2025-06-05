# @nodus/x

@nodus/x é uma biblioteca de componentes web baseada em **dataflow**. Cada componente propaga dados automaticamente para os demais, permitindo criar fluxos declarativos sem a necessidade de gerenciar estado como fazemos em React, Vue ou Angular. Você pode montar interfaces completas sem escrever nenhuma linha de JavaScript: basta combinar os elementos do Nodus e o fluxo cuidará das atualizações.

>⚠️  Este projeto ainda está em desenvolvimento ativo e as APIs podem mudar.

## Instalação

### npm ou bun

```bash
npm install @nodusjs/x
# ou
bun add @nodusjs/x
```

Depois de instalar, importe o pacote principal para registrar os componentes:

```javascript
import "@nodusjs/x";
```

Se preferir, carregue o CSS da própria biblioteca:

```javascript
import "@nodusjs/x/dist/x.css";
```

## Uso via CDN

Para testar ou prototipar rapidamente, utilize os arquivos hospedados em uma CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@nodusjs/x@latest/dist/x.js"></script>

<!-- ou para navegadores sem suporte a módulos -->
<script src="https://cdn.jsdelivr.net/npm/@nodusjs/x@latest/dist/x.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nodusjs/x@latest/dist/x.css">
```

## Exemplo básico

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Exemplo @nodus/x</title>
  <script src="https://cdn.jsdelivr.net/npm/@nodusjs/x@latest/dist/x.iife.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nodusjs/x@latest/dist/x.css">
</head>
<body>
  <x-input name="raca">
    <x-label>Raça de cachorro</x-label>
  </x-input>

  <x-render>
    <template>
      <x-text>{name}</x-text><br />
    </template>
    <x-on value="api/ok:method/render"></x-on>
  </x-render>

  <x-fetch name="api" url="https://api.thedogapi.com/v1/breeds/search?q={}">
    <x-on value="raca/change:method/get"></x-on>
  </x-fetch>
</body>
</html>
```

## Scripts

- `npm run dev` inicia o servidor de desenvolvimento
- `npm run build` gera os arquivos de distribuição
- `npm test` executa a suíte de testes

## Contribuindo

Contribuições são bem-vindas! Abra issues, envie pull requests e participe do desenvolvimento do projeto.

## Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
