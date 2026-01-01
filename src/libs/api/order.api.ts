import { Order, OrderDetails } from '@/types/app/order.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getOrders = async (params?: Record<string, string | number | boolean>) => {
  const res = await serverApiFetch<Order[]>('/order', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getOrderById = async (id: string) => {
  const res = await serverApiFetch<OrderDetails>(`/order/${id}`, {
    method: 'GET'
  })

  return unwrapApi(res)
}

export const changeStatusOrder = async (orderId: number, status: 'CANCELLED' | 'DELIVERED') => {
  const res = await serverApiFetch<Order[]>(`/order/status/${orderId}`, {
    method: 'PATCH',
    body: { status }
  })

  return unwrapApi(res)
}
