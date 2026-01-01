import { Attribute, AttributeFormType } from '@/types/app/productAttributes.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getAttributes = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<Attribute[]>('/attribute', {
    method: 'GET',
    query: { includeValues: true, ...params }
  })

  return unwrapApi(res)
}

export const getAttribute = async (id: number) => {
  const res = await serverApiFetch<Attribute>(`/attribute/${id}`, {
    method: 'GET'
  })

  return unwrapApi(res)
}

export const createAttribute = async (data: AttributeFormType) => {
  const res = await serverApiFetch<Attribute>('/attribute', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}

export const updateAttribute = async (id: string, data: Partial<AttributeFormType>) => {
  const res = await serverApiFetch<Attribute>(`/attribute/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const removeAttribute = async (id: string) => {
  const res = await serverApiFetch<{ message: string; attribute: Attribute }>(`/attribute/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}
