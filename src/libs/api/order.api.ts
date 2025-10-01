import { Order, OrderDetails } from '@/types/app/order.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getOrders = async (params?: Record<string, string>): Promise<Response<Order[]>> => {
  const res = await serverApiFetch('/order', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const getOrderById = async (id: string): Promise<{ status: number; data: OrderDetails }> => {
  const res = await serverApiFetch(`/order/${id}`, {
    method: 'GET'
  })

  console.log(res)

  return {
    ...res
  }
}

export const changeStatusOrder = async (orderId: number, status: 'CANCELLED' | 'DELIVERED'): Promise<Response<Order[]>> => {
  const res = await serverApiFetch(`/order/status/${orderId}`, {
    method: 'PATCH',
    body: { status }
  })

  return {
    ...res
  }
}
