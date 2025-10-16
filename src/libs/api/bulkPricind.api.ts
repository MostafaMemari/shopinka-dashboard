import { BulkPricingFormType } from '@/types/app/bulkPricing.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getBulkPricings = async (params?: Record<string, string>): Promise<Response<any[]>> => {
  const res = await serverApiFetch('/bulk-pricing', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const getBulkPricingById = async (id: number): Promise<{ status: number; data: any | null }> => {
  const res = await serverApiFetch(`/bulk-pricing/${id}`, {
    method: 'GET'
  })

  return {
    ...res
  }
}

export const updateBulkPricing = async (id: number, data: Partial<BulkPricingFormType>): Promise<{ status: number; data: any | null }> => {
  const res = await serverApiFetch(`/bulk-pricing/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createBulkPricing = async (data: BulkPricingFormType): Promise<{ status: number; data: { page: any | null } }> => {
  console.log(data)

  const res = await serverApiFetch('/bulk-pricing', {
    method: 'POST',
    body: { ...data }
  })

  console.log(res)

  return {
    ...res,
    status: 201
  }
}

export const removeBulkPricing = async (id: string): Promise<{ status: number; data: { message: string; page: any } | null }> => {
  const res = await serverApiFetch(`/bulk-pricing/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}
