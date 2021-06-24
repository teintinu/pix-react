import React, { createElement, ReactElement } from 'react'
import { usePixPayload } from './pixPayloadHook'
import { PixParams } from './pixPayload'
import QRCode, { CanvasQRCodeProps, SvgQRCodeProps } from 'qrcode.react'

export type PixQRCodeProps = (
  | Omit<CanvasQRCodeProps, 'value'>
  | Omit<SvgQRCodeProps, 'value'>
) & {
  pixParams: PixParams
}

export function PixQRCode ({
  pixParams,
  ...props
}: PixQRCodeProps): ReactElement {
  const [value, error] = usePixPayload(pixParams)
  return error ? (
    <span>{error.message}</span>
  ) : (
    createElement(QRCode, { ...props, value })
  )
}
