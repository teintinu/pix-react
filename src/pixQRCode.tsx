import React, { createElement, CSSProperties, ReactElement } from 'react'
import { usePixPayload } from './pixPayloadHook'
import { PixParams } from './pixPayload'
import { QRCodeSVG } from 'qrcode.react'

export type PixQRCodeProps = Omit<React.ComponentProps<typeof QRCodeSVG>, 'value'>
  & {
    pixParams: PixParams
  }

export function PixQRCode({
  pixParams,
  ...props
}: PixQRCodeProps): ReactElement {
  const [value, error] = usePixPayload(pixParams)
  return error ? (
    <span>{error.message}</span>
  ) : (
    createElement(QRCodeSVG, { ...props, value } as any)
  )
}
