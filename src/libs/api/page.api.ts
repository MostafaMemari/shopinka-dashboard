import { Page, PageFormType } from '@/types/app/page.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getPages = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<Page[]>('/page', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getPageById = async (id: number) => {
  const res = await serverApiFetch<Page>(`/page/${id}`, {
    method: 'GET'
  })

  return unwrapApi(res)
}

export const updatePage = async (id: number, data: Partial<PageFormType>) => {
  const res = await serverApiFetch<Page>(`/page/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createPage = async (data: PageFormType) => {
  const res = await serverApiFetch<{ page: Page }>('/page', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}

export const removePage = async (id: string) => {
  const res = await serverApiFetch<{ message: string; page: Page }>(`/page/${id}`, {
    method: 'DELETE'
  })

  return unwrapApi(res)
}
