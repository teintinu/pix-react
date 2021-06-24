import { crc } from 'polycrc'

export interface PixParams {
  chave: string
  cidade: string
  recebedor: string
  valor?: number
  identificador: string
  mensagem?: string
  cep?: string
}

export function pixPayload({
  chave,
  cidade,
  recebedor,
  valor,
  identificador,
  mensagem: meensagem,
  cep
}: PixParams) {
  if (!chave) throw new Error('Chave PIX é obrigatória')
  if (!recebedor) throw new Error('Recebedor é obrigatório')
  if (!cidade) throw new Error('Cidade é obrigatória')
  if (!identificador) throw new Error('Identificador do PIX é obrigatório')
  if (valor && valor < 0.01) throw new Error('Valor não pode ser negativo')

  const versao = '01'
  const BRL = '986'
  const repeticao = '11'
  const pais = 'BR'

  const payloadKeyString = generateKey(chave, meensagem)

  const payload: string[] = [
    genEMV('00', versao),
    genEMV('01', repeticao),
    genEMV('26', payloadKeyString),
    genEMV('52', '0000'),
    genEMV('53', BRL)
  ]

  if (valor) {
    payload.push(genEMV('54', valor.toFixed(2)))
  }

  payload.push(genEMV('58', pais))
  payload.push(genEMV('59', recebedor))
  payload.push(genEMV('60', cidade.toLocaleUpperCase()))

  if (cep) {
    payload.push(genEMV('61', cep))
  }

  payload.push(genEMV('62', genEMV('05', identificador)))

  payload.push('6304')

  const stringPayload = payload.join('')
  const buffer = Buffer.from(stringPayload, 'utf8')

  const crc16CCiTT = crc(16, 0x1021, 0xffff, 0x0000, false)
  const crcResult = crc16CCiTT(buffer).toString(16).toUpperCase()

  return stringPayload + crcResult
}

function generateKey(key: string, message?: string): string {
  const payload: string[] = [genEMV('00', 'BR.GOV.BCB.PIX'), genEMV('01', key)]
  if (message) {
    payload.push(genEMV('02', message))
  }
  return payload.join('')
}

function genEMV(id: string, parameter: string): string {
  const len = parameter.length.toString().padStart(2, '0')
  return `${id}${len}${parameter}`
}
