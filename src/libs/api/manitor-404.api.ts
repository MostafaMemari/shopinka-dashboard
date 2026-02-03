import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'
import { BulkPricingItem } from '@/types/app/bulkPricing.type'

export const getManitor404s = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<BulkPricingItem[]>('/seo-404-log', {
    method: 'GET',
    query: { ...params }
  })

  console.log(res)

  return unwrapApi(res)
}

export const removeManitor404 = async (id: string) => {
  const res = await serverApiFetch<{ message: string; page: any }>(`/seo-404-log/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}
