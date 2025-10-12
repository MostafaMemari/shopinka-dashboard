import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { getShippings } from '@/libs/api/shipping.api'

export function useShippings({ enabled = true, params = {}, staleTime = 5 * 60 * 1000 }: QueryOptions) {
  const fetchShipping = () => getShippings(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Shippings, params],
    queryFn: fetchShipping,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
