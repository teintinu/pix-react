# pix-react

QRCode para pagamento PIX / QRCode for Brazilian PIX payment

![CI](https://github.com/teintinu/pix-react/actions/workflows/node.js.yml/badge.svg)

[![codecov](https://codecov.io/gh/teintinu/pix-react/branch/main/graph/badge.svg?token=5UB7FBgIdA)](https://codecov.io/gh/teintinu/pix-react)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fteintinu%2Fpix-react.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fteintinu%2Fpix-react?ref=badge_shield)

## Instalação

```sh
npm install pix-react
```

## Uso

```js
var React = require('react');
var { PixQRCode } = require('pix-react');

React.render(
  <PixQRCode
        pixParams={{
          chave: 'recebedor@email.com',
          recebedor: 'Nome do reebedor',
          cidade: 'Nome da Cidade',
          identificador: '123',
          valor: 123.45,
          mensagem: 'minha mensagem'
        }}
        renderAs="svg"
        includeMargin={true}
        size={256}
      />,
  mountNode
);
```

# demonstração

[Clique aqui para ver uma demonstração online](https://codesandbox.io/embed/kind-dubinsky-mxc81?fontsize=14&hidenavigation=1&theme=dark&view=preview)

## Parâmetros PIX
A propriedade pixParams concentra os parâmetros necessários para gerar o PIX

parametro       | tipo                 | Observações
----------------|----------------------|--------------
`chave`         | `string`             | Informe aqui a Chave PIX, use apenas números para CPF ou CNPJ, se for telefone use o padrão internacional.
`recebedor`     | `string`             | Nome do(a) recebedor(a)
`cidade`        | `string`             | Nome da Cidade do(a) recebedor(a) ou do(a) pagador(a)
`identificador` | `string`             | Identificador do pagamento
`valor`         | `number`             | Valor do PIX
`mensagem`      | `string`             | Mensagem adicioinal no PIX (não obrigatória)

### Propriedades herdadas de `qrcode.react`

prop      | type                 | default value
----------|----------------------|--------------
`renderAs`| `string` (`'canvas' 'svg'`) | `'canvas'`
`size`    | `number`             | `128`
`bgColor` | `string` (CSS color) | `"#FFFFFF"`
`fgColor` | `string` (CSS color) | `"#000000"`
`level`   | `string` (`'L' 'M' 'Q' 'H'`)            | `'L'`
`includeMargin` | `boolean`      | `false`
`imageSettings` | `object` (see below) |

#### `imageSettings`

field      | type                 | default value
-----------|----------------------|--------------
`src`      | `string`             |
`x`        | `number`             | none, will center
`y`        | `number`             | none, will center
`height`   | `number`             | 10% of `size`
`width`    | `number`             | 10% of `size`
`excavate` | `boolean`            | `false`

Mais informações sobre [qrcode.react](https://github.com/zpao/qrcode.react)

# Referência

Este projeto foi escrito tendo como base o projeto: https://github.com/joseviniciusnunes/qrcode-pix/

