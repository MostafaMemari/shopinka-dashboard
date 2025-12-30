import { Shipping, ShippingFormType } from '@/types/app/shipping.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/libs/serverApiFetch'

import { ShippingForm } from '@/views/pages/shipping/DesktopShippingTable'

export const getShippings = async (params?: Record<string, string>): Promise<Response<Shipping[]>> => {
  const res = await serverApiFetch('/shipping', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getShipping = async (id: number): Promise<{ status: number; data: ShippingFormType | null }> => {
  const res = await serverApiFetch(`/shipping/${id}}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const removeShipping = async (id: string): Promise<{ status: number; data: { message: string; shipping: ShippingForm } | null }> => {
  const res = await serverApiFetch(`/shipping/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateShipping = async (id: string, data: Partial<ShippingFormType>): Promise<{ status: number; data: ShippingForm | null }> => {
  const res = await serverApiFetch(`/shipping/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createShipping = async (data: Omit<ShippingFormType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ status: number; data: ShippingForm | null }> => {
  const res = await serverApiFetch('/shipping', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}
