import { changeStatusOrder, getOrders } from '@/libs/api/order.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { showToast } from '@/utils/showToast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useOrders({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchOrders = () => getOrders(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Orders, params],
    queryFn: fetchOrders,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

export function useChangeOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: 'CANCELLED' | 'DELIVERED' }) => changeStatusOrder(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] })
    },
    onError: () => {
      showToast({ type: 'warning', message: 'خطا در تکمیل سفارش' })
    }
  })
}
