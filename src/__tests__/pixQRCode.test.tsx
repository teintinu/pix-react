import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { PixQRCode } from '..'

describe('Pix QRCode', () => {
  it('QRCode with default arguments', () => {
    const component = renderer.create(
      <PixQRCode
        pixParams={{
          chave: 'recebedor@email.com',
          recebedor: 'Nome do reebedor',
          cidade: 'Nome da Cidade',
          identificador: '123',
          valor: 123.45,
          mensagem: 'minha mensagem'
        }}
        includeMargin={true}
        size={256}
      />
    )

    expect(component.toJSON()).toMatchSnapshot()
    act(() => {})
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('Error in pixParams', () => {
    const component = renderer.create(
      <PixQRCode
        pixParams={{
          chave: '',
          recebedor: 'Nome do reebedor',
          cidade: 'Nome da Cidade',
          identificador: '123',
          valor: 123.45,
          mensagem: 'minha mensagem'
        }}
        includeMargin={true}
        size={256}
      />
    )

    expect(component.toJSON()).toMatchSnapshot()
    act(() => {})
    expect(component.toJSON()).toMatchSnapshot()
  })
})
