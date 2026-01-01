import { Comment, CommentForm } from '@/types/app/comment.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getComments = async (params?: Record<string, string | boolean>) => {
  const res = await serverApiFetch<{ items: Comment[]; pager: any }>('/comment/admin', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const updateComment = async (id: string, data: Partial<CommentForm>) => {
  const res = await serverApiFetch<Comment>(`/comment/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createComment = async (data: CommentForm) => {
  const res = await serverApiFetch<Comment>('/comment', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}

export const removeComment = async (id: string) => {
  const res = await serverApiFetch<{ message: string; comment: CommentForm }>(`/comment/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}

export const toggleCommentStatus = async (id: string) => {
  const res = await serverApiFetch<{ message: string; comment: CommentForm }>(`/comment/toggle-active/${id}`, { method: 'PATCH' })

  return unwrapApi(res)
}
