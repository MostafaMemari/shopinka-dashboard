import { Shipping, ShippingFormType } from '@/types/app/shipping.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'
import { ShippingForm } from '@/views/pages/shipping/DesktopShippingTable'

export const getShippings = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<Shipping[]>('/shipping', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getShipping = async (id: number) => {
  const res = await serverApiFetch<ShippingFormType>(`/shipping/${id}`, { method: 'GET' })

  return unwrapApi(res)
}

export const removeShipping = async (id: string) => {
  const res = await serverApiFetch<{ message: string; shipping: ShippingForm }>(`/shipping/${id}`, {
    method: 'DELETE'
  })

  return unwrapApi(res)
}

export const updateShipping = async (id: string, data: Partial<ShippingFormType>) => {
  const res = await serverApiFetch<ShippingForm>(`/shipping/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const setDefaultShiping = async (id: number) => {
  const res = await serverApiFetch<Shipping[]>(`/shipping/${id}/default`, {
    method: 'PATCH'
  })

  return unwrapApi(res)
}

export const createShipping = async (data: Omit<ShippingFormType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
  const res = await serverApiFetch<ShippingForm>('/shipping', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}
