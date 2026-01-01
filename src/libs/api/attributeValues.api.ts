import { AttributeValueFormType, AttributeValue } from '@/types/app/productAttributes.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const removeAttributeValue = async (id: string) => {
  const res = await serverApiFetch<{ message: string; attribute: AttributeValue }>(`/attribute-value/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}

export const updateAttributeValues = async (id: string, data: Partial<AttributeValueFormType>) => {
  const res = await serverApiFetch<AttributeValue>(`/attribute-value/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createAttributeValues = async (data: Omit<AttributeValueFormType, 'id'>) => {
  const res = await serverApiFetch<AttributeValue>('/attribute-value', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}
