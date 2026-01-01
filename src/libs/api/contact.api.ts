import { Contact } from '@/types/app/contact.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getContacts = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<Contact[]>('/contact', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const removeContact = async (id: string) => {
  const res = await serverApiFetch<{ message: string; page: any }>(`/contact/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}
