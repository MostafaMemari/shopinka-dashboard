import { MaterialSticker } from '@/types/app/material-sticker.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getCustomStickers = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<MaterialSticker[]>('/custom-sticker', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}
