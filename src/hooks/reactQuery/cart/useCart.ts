import { getCarts } from '@/libs/api/cart.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useCarts({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchCart = () => getCarts().then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Carts, params],
    queryFn: fetchCart,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
