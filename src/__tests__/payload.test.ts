import { pixPayload } from '..'

describe('Gera payload do PIX', () => {
  it('Sem valor', async () => {
    const response = pixPayload({
      chave: 'recebedor@email.com',
      recebedor: 'Nome do reebedor',
      cidade: 'Nome da Cidade',
      identificador: '123'
    })
    expect(response).toBe(
      '00020101021126410014BR.GOV.BCB.PIX0119recebedor@email.com5204000053039865802BR5916Nome do reebedor6014NOME DA CIDADE620705031236304E5CC'
    )
  })

  it('Com valor', async () => {
    const response = pixPayload({
      chave: 'recebedor@email.com',
      recebedor: 'Nome do reebedor',
      cidade: 'Nome da Cidade',
      identificador: '123',
      valor: 123.45
    })
    expect(response).toBe(
      '00020101021126410014BR.GOV.BCB.PIX0119recebedor@email.com5204000053039865406123.455802BR5916Nome do reebedor6014NOME DA CIDADE6207050312363047366'
    )
  })

  it('Com cep', async () => {
    const response = pixPayload({
      chave: 'recebedor@email.com',
      recebedor: 'Nome do reebedor',
      cidade: 'Nome da Cidade',
      identificador: '123',
      valor: 123.45,
      cep: '85000100'
    })
    expect(response).toBe(
      '00020101021126410014BR.GOV.BCB.PIX0119recebedor@email.com5204000053039865406123.455802BR5916Nome do reebedor6014NOME DA CIDADE6108850001006207050312363049E'
    )
  })

  it('Com mensagem', async () => {
    const response = pixPayload({
      chave: 'recebedor@email.com',
      recebedor: 'Nome do reebedor',
      cidade: 'Nome da Cidade',
      identificador: '123',
      valor: 123.45,
      mensagem: 'minha mensagem'
    })
    expect(response).toBe(
      '00020101021126590014BR.GOV.BCB.PIX0119recebedor@email.com0214minha mensagem5204000053039865406123.455802BR5916Nome do reebedor6014NOME DA CIDADE620705031236304D500'
    )
  })

  it('Chave PIX é obrigatória', async () => {
    expect(() =>
      pixPayload({
        chave: '',
        recebedor: 'Nome do reebedor',
        cidade: 'Nome da Cidade',
        identificador: '123',
        valor: 123.45,
        mensagem: 'minha mensagem'
      })
    ).toThrow(/Chave PIX é obrigatória/)
  })

  it('Recebedor é obrigatório', async () => {
    expect(() =>
      pixPayload({
        chave: 'recebedor@email.com',
        recebedor: '',
        cidade: 'Nome da Cidade',
        identificador: '123',
        valor: 123.45,
        mensagem: 'minha mensagem'
      })
    ).toThrow(/Recebedor é obrigatório/)
  })

  it('Cidade é obrigatória', async () => {
    expect(() =>
      pixPayload({
        chave: 'recebedor@email.com',
        recebedor: 'Nome do reebedor',
        cidade: '',
        identificador: '123',
        valor: 123.45,
        mensagem: 'minha mensagem'
      })
    ).toThrow(/Cidade é obrigatória/)
  })

  it('Identificador do PIX é obrigatório', async () => {
    expect(() =>
      pixPayload({
        chave: 'recebedor@email.com',
        recebedor: 'Nome do reebedor',
        cidade: 'Nome da Cidade',
        identificador: '',
        valor: -123.45,
        mensagem: 'minha mensagem'
      })
    ).toThrow(/Identificador do PIX é obrigatório/)
  })

  it('Valor não pode ser negativo', async () => {
    expect(() =>
      pixPayload({
        chave: 'recebedor@email.com',
        recebedor: 'Nome do reebedor',
        cidade: 'Nome da Cidade',
        identificador: '123',
        valor: -123.45,
        mensagem: 'minha mensagem'
      })
    ).toThrow(/Valor não pode ser negativo/)
  })
})
