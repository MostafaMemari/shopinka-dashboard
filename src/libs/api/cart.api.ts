import { OrderDetails } from '@/types/app/order.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getCarts = async () => {
  const res = await serverApiFetch<OrderDetails>(`/admin/cart`, {
    method: 'GET'
  })

  return unwrapApi(res)
}

export const getCartByUserId = async (userId: string) => {
  const res = await serverApiFetch<OrderDetails>(`/admin/cart/user/${userId}`, {
    method: 'GET'
  })

  return unwrapApi(res)
}
