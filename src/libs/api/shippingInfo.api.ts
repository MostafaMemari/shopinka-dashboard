import { ShippingInfo, ShippingInfoType } from '@/types/app/shippingInfo.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getShippings = async (params?: { page?: number; take?: number }) => {
  const res = await serverApiFetch<ShippingInfo[]>('/shipping-info', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const updateShippingInfo = async (id: string, data: Partial<ShippingInfoType>) => {
  const res = await serverApiFetch<ShippingInfo>(`/shipping-info/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const addShippingInfo = async (data: ShippingInfoType) => {
  const res = await serverApiFetch<ShippingInfo>('/shipping-info', {
    method: 'POST',
    body: { ...data, sentAt: new Date() }
  })

  return unwrapApi(res)
}
