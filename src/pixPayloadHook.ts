import { useState, useEffect } from 'react'
import { PixParams, pixPayload } from './pixPayload'

export type PixPayloadResult = [string, null | Error]

export function usePixPayload(params: PixParams): PixPayloadResult {
  const [result, setResult] = useState<PixPayloadResult>(['', null])
  useEffect(() => {
    try {
      setResult([pixPayload(params), null])
    } catch (e) {
      setResult(['', e])
    }
  }, [params])
  return result
}
