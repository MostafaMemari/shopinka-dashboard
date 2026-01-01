import { BulkPricingFormType } from '@/types/app/bulkPricing.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getBulkPricings = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<any[]>('/bulk-pricing', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getBulkPricingById = async (id: number) => {
  const res = await serverApiFetch<any>(`/bulk-pricing/${id}`, {
    method: 'GET'
  })

  return unwrapApi(res)
}

export const updateBulkPricing = async (id: number, data: Partial<BulkPricingFormType>) => {
  const res = await serverApiFetch<any>(`/bulk-pricing/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createBulkPricing = async (data: BulkPricingFormType) => {
  const res = await serverApiFetch<{ page: any }>('/bulk-pricing', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}

export const removeBulkPricing = async (id: string) => {
  const res = await serverApiFetch<{ message: string; page: any }>(`/bulk-pricing/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}
